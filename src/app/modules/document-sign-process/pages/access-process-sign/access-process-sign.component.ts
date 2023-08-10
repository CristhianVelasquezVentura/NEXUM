import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, UntypedFormBuilder, UntypedFormControl, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {SignService} from "@app/core/services/sign/sign.service";
import {GetTokenUser, onlyNumbers} from "@app/core/utils/validations/validations";
import {Token} from "@app/core/models/token";
import {Router} from "@angular/router";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {EnvServiceProvider} from "@app/core/services/env/env.service.provider";

@Component({
  selector: 'app-access-process-sign',
  templateUrl: './access-process-sign.component.html',
  styleUrls: ['./access-process-sign.component.scss']
})
export class AccessProcessSignComponent implements OnInit, OnDestroy {

  @Output() authorized: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _subscription: Subscription = new Subscription();
  public accessOtp: FormControl;
  public recaptcha: FormControl;
  public isBlocked: boolean = false;
  private tokenData!: Token;
  public siteKey: string = '';
  public hour: string = 'Días';

  constructor(
    private _signService: SignService,
    private _fb: UntypedFormBuilder,
    private _router: Router,
    private _messageService: ToastService
  ) {
    this.accessOtp = new FormControl('', Validators.required);
    this.recaptcha = new FormControl('', Validators.required);
    const accessToken = sessionStorage.getItem('signature-token');
    if (!accessToken) {
      this._router.navigateByUrl('/sign');
      return;
    }

    this.tokenData = GetTokenUser(accessToken);
    this.getDataDynamic();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    let dateHour = new Date().getHours();
    if(dateHour >= 24 && dateHour < 12){
      this.hour = 'Días';
    }
    if(dateHour >= 12 && dateHour < 18){
      this.hour = 'Tardes';
    }
    if(dateHour >= 18 && dateHour < 24){
      this.hour = 'Noches';
    }
  }

  /**
   * Método que restringe a un capo de texto solo ingresar números
   * @param value
   */
  public onlyNumber = (value: any) => onlyNumbers(value);

  /**
   * Método que permite validar el código de acceso del firmante
   */
  public validateAccessCode(): void {

    if (this.recaptcha.invalid) {
      this._messageService.add({
        type: 'warning',
        message: 'El captcha es requerido!',
        life: 5000,
      });
      return;
    }

    if (this.accessOtp.invalid) {
      this._messageService.add({
        type: 'warning',
        message: 'El codigo OTP es requerido!',
        life: 5000,
      });
      return;
    }

    this.isBlocked = true;
    this._subscription.add(
      this._signService.validateAccessCode(this.tokenData.signer, this.accessOtp.value, this.tokenData.document).subscribe({
        next: (response) => {
          if (response.error) {
            this._messageService.add({type: 'error', message: response.msg, life: 5000});
            this.isBlocked = false;
            return;
          }

          if (response.data) {
            this.authorized.emit(true);
            this.isBlocked = false;
            return;
          }

          this.isBlocked = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isBlocked = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo validar el código OTP, intente nuevamente!',
            life: 5000
          });
        }
      })
    );
  }

  public getDataDynamic(): void {
    this.siteKey = EnvServiceProvider.useFactory().GOOGLE_RECAPTCHA_SITEKEY;
  }
}
