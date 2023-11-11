import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetTokenExpirationDate, GetTokenUser, IsInvalidToken} from "@app/core/utils/validations/validations";
import {Observable, Subscription, timer} from "rxjs";
import {Time} from "@app/core/utils/constant/constant";
import {Token} from "@app/core/models/token";
import {SignService} from "@app/core/services/sign/sign.service";
import {Message} from "@app/core/models/message";
import {ToastService} from "@app/public/services/toast/toast.service";
import {Signature} from "@app/core/models/signer";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-document-sign-process',
  templateUrl: './document-sign-process.component.html',
  styleUrls: ['./document-sign-process.component.scss']
})
export class DocumentSignProcessComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();
  private _source: Observable<number> = timer(0, 1000);
  private _token: string = '';
  private _signatureImg: string = '';
  private _tokenData!: Token;

  public day: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public isFinish: boolean = false;
  public page: string = 'access-code';
  //public page: string = 'selfie-test';
  public message!: Message;
  public isBlock: boolean = false;

  constructor(
    private _routerParam: ActivatedRoute,
    private _messageService: ToastService,
    private _signService: SignService
  ) {
    this.getParams();
  }

  ngOnInit(): void {
    //this.initSession();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * Método que valida la existensia del token de sesión y si este es valido
   * @private
   */
  private initSession(): void {
    if (!this._token) {
      this._messageService.add({
        type: 'warning',
        message: 'No está autorizado para firmar este documento!',
        life: 5000
      });
      this.message = {
        icon: 'Warning',
        message: 'No está autorizado para firmar este documento!'
      };
      this.isFinish = true;
      return;
    }

    if (IsInvalidToken(this._token)) {
      this._messageService.add({type: 'warning', message: 'El documento ha caducado!', life: 5000});
      this.message = {
        icon: 'Warning',
        message: 'El documento ha caducado!'
      };
      this.isFinish = true;
      return;
    }

    this._tokenData = GetTokenUser(this._token);
    this.getSignersParams(this._tokenData.signer);
    this.initClock();
  }

  /**
   * Método que obtiene los parametros de la URL como el token y otros parametros
   * @private
   */
  private getParams(): void {
    const routeParam = this._routerParam.snapshot.queryParams;
    const token = routeParam['token'];
    if (token) {
      sessionStorage.setItem("signature-token", token);
      this._token = token;
    }
  }

  /**
   * Inicia el contador que define el tiempo de vida del documento
   * @private
   */
  private initClock(): void {
    const ttl = GetTokenExpirationDate(this._token);
    if (!ttl) {
      this._messageService.add({
        type: 'warning',
        message: 'No se pudo obtener el tiempo de vida del documento',
        life: 5000
      });
      this.isFinish = true;
      return;
    }
    this._subscriptions.add(
      this._source.subscribe(() => {
        this.showDate(ttl);
      })
    );
  }

  /**
   * Método que setea la fecha (día, hora, minutos y segundo) de expiración del documento y termina la sesión si ya expiro el documento
   * @param ttl - fecha de expiración del token de sesión
   * @private
   * @type {(ttl: string): string}
   */
  private showDate(ttl: Date): void {
    const now: any = Time.Now();
    const end: any = Time.setDate(ttl);
    let distance: number = end - now;
    this.day = Math.floor(distance / Time.DAY);
    this.hours = Math.floor((distance % Time.DAY) / Time.HOUR);
    this.minutes = Math.floor((distance % Time.HOUR) / Time.MINUTE);
    this.seconds = Math.floor((distance % Time.MINUTE) / Time.SECOND);

    if (this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.day === 0) {
      this._messageService.add({type: 'info', message: 'La sesión ha expirado!', life: 5000});
      this.isFinish = true;
      return;
    }
  }

  /**
   * Método que valida la autenticación del access code del firmate
   */
  public authenticated(): void {
    this.page = 'selfie-test';
  }

  /**
   * Método que permite ir a la siguiente pagina del proceso de firma
   * @param page
   */
  public goToPage(page: string): void {
    this.page = page;
  }

  /**
   * Método para guardar la imagen exportada
   * @param image
   */
  public saveSignature(image: string): void {
    this._signatureImg = image.split(',')[1];
    this.page = 'otp-finish';
  }

  /**
   * Método que los datos de la firma para completar la firma
   */
  public sendSignature(): void {
    this.isBlock = true;
    const finalData: Signature = {
      id_signer: this._tokenData.signer,
      file_signature: this._tokenData.document + this._tokenData.signer + this._tokenData.user.id_number,
      encode: this._signatureImg,
      document_id: this._tokenData.document
    }
    this._subscriptions.add(
      this._signService.sendSignature(finalData).subscribe({
        next: (res) => {
          if (res.error && res.code !== 29) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            this.isBlock = false;
            return;
          }

          this.message = {
            message: 'Firma generada correctamente',
            icon: 'success',
          }
          this.isFinish = true;
          this.isBlock = false;
        },
        error: (err: Error) => {
          this.isBlock = false;
          console.error(err.message);
          this._messageService.add({type: 'error', message: 'No se pudo firmar el documento!', life: 5000});
        }
      })
    );
  }

  /**
   * Método para obtener la configuración para el firmate y validar si la firma ya fue realizada
   * @param signerID
   * @private
   */
  private getSignersParams(signerID: number): void {
    this.isBlock = true;
    this._subscriptions.add(
      this._signService.getSignersParams(signerID).subscribe({
        next: (res) => {
          this.isBlock = false;
          if (res.error || res.code !== 29) {
            this._messageService.add({type: res.code !== 29 ? 'info' : 'error', message: res.msg, life: 5000});
            this.message = {
              message: res.msg,
              icon: 'info'
            };
            this.isFinish = true;
            return;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isBlock = false;
          this.message = {
            message: 'No se pudo obtener los parametros de la firma, intente nuevamente!',
            icon: 'info'
          };
          this.isFinish = true;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo obtener los parametros de la firma!',
            life: 5000
          });
        }
      })
    );
  }

}
