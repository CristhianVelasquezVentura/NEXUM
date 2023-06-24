import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {OtpService} from "@app/core/services/otp/otp.service";
import {Token} from "@app/core/models/token";
import {GetTokenUser} from "@app/core/utils/validations/validations";
import {OtpRequest} from "@app/core/models/otp";

@Component({
  selector: 'app-valid-sign',
  templateUrl: './valid-sign.component.html',
  styleUrls: ['./valid-sign.component.scss']
})
export class ValidSignComponent implements OnInit, OnDestroy {

  @Output('end-process') endProcess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('back-page') backPage: EventEmitter<string> = new EventEmitter<string>();
  private _subscriptions: Subscription = new Subscription();
  private _tokenData!: Token;
  public otpForm: UntypedFormControl;
  public isFinish: boolean = false;
  public isBlock: boolean = false;

  constructor(
    private _router: Router,
    private _messageService: ToastService,
    private _otpService: OtpService
  ) {
    this.otpForm = new UntypedFormControl('', Validators.required);
    const token = sessionStorage.getItem('signature-token');
    if (!token) {
      this._router.navigateByUrl('/sign');
      return;
    }
    this._tokenData = GetTokenUser(token);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.generateCodeOTP();
  }

  /**
   * Método que genera el OTP para poder terminar con el proceso de firma
   * @private
   */
  private generateCodeOTP(): void {
    this.isBlock = true;
    this._subscriptions.add(
      this._otpService.generateOtp(this._tokenData.signer).subscribe({
        next: (res) => {
          this._messageService.add({type: res.error ? 'error' : 'success', message: res.msg, life: 5000});
          this.isBlock = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            type: 'error',
            message: 'No se pudo generar el OTP, intente nuevamente',
            life: 5000
          });
          this.isBlock = false;
        }
      })
    );
  }

  /**
   * Método para enviar a firmar y validar el código OTP
   */
  public validateOtp(): void {
    if (this.otpForm.invalid) {
      this._messageService.add({type: 'warning', message: "El código Otp es requrido", life: 5000});
      return;
    }

    const data: OtpRequest = {
      id_signer: this._tokenData.signer,
      otp: this.otpForm.value
    }
    this.isBlock = true;
    this._subscriptions.add(
      this._otpService.validateOtp(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            this.isBlock = false;
            return;
          }

          this.endProcess.emit(true);
          this.isFinish = true;
          this.isBlock = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isBlock = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo validar el codigo OTP, intenten de nuevo',
            life: 5000
          });
        }
      })
    );
  }

}
