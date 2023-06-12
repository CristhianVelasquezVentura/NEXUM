import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {SignService} from "@app/core/services/sign/sign.service";
import {getTokenUser, onlyNumbers} from "@app/core/utils/validations/validations";
import {Token} from "@app/core/models/token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-access-process-sign',
  templateUrl: './access-process-sign.component.html',
  styleUrls: ['./access-process-sign.component.scss']
})
export class AccessProcessSignComponent implements OnInit {

  @Input() signer: any;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() finished: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _subscription: Subscription = new Subscription();
  public accessOtp: FormControl;
  public validCode: boolean = false;
  public isBlocked: boolean = false;

  private tokenData!: Token;

  constructor(
    private _signService: SignService,
    private _fb: FormBuilder,
    private _router: Router
    // private _messageService: ToastService
  ) {
    this.accessOtp = new FormControl('', Validators.required);
    const accessToken = sessionStorage.getItem('signature-token');
    if (!accessToken) {
      // this._router.navigateByUrl('/sign/review-doc');
      // return;
    }

    this.tokenData = getTokenUser(accessToken || '');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  public onlyNumber = (value: any) => onlyNumbers(value);

  public validateAccessCode(): void {
    if (this.accessOtp.invalid) {
      /*this._messageService.add({
        type: 'warning',
        message: 'El codigo OTP es requerido!',
        life: 5000,
      });*/
      return;
    }

    this.isBlocked = true;
    this._subscription.add(
      this._signService.validateAccessCode(this.tokenData.signer, this.accessOtp.value).subscribe({
        next: async (response) => {
          if (response.error) {
            //this._messageService.add({type: 'error', message: response.msg, life: 5000});
            this.isBlocked = false;
            return;
          }

          if (response.data) {
            /*this.finished.emit(true);
            this.nextStep.emit(2);*/
            this.isBlocked = false;
            await this._router.navigateByUrl('/sign/review-doc');
            return;
          }

          this.validCode = !!response.data;
          this.isBlocked = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isBlocked = false;
          /*this._messageService.add({
            type: 'error',
            message: 'No se pudo validar el código OTP, intente nuevamente!',
            life: 5000
          });*/
        }
      })
    );
  }
}
