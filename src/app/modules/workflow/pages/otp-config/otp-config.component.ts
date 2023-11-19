import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormWorkflowService} from '@app/core/forms/workflow/form-workflow.service';
import {Router, RouterLink} from '@angular/router';

import {languages, timeOptions} from "@app/core/utils/data/constant";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {IFormSignerNotifyEMAILValues, IValuesStep3, IValuesStep4} from "@app/core/models/workflow/workflow.model";
import {ToastService} from "@app/public/services/toast/toast.service";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {ToastComponent} from "@app/public/toast/toast.component";
import {HeaderNexumComponent} from "@app/core/ui";

@Component({
  selector: 'app-otp-config',
  templateUrl: './otp-config.component.html',
  styleUrls: ['./otp-config.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgForOf,
    JsonPipe,
    NgIf,
    ToastComponent,
    HeaderNexumComponent
  ],
  standalone: true,
  providers: [ToastService]
})
export class OtpConfigComponent implements OnInit {
  public otpForm: FormGroup;
  public otpNotifySMSForm: FormGroup;
  public otpNotifyEMAILForm: FormGroup;
  public readonly timeData = timeOptions;

  constructor(
    private _formDataService: FormWorkflowService,
    private _router: Router,
    private _messageService: ToastService,
    private _sessionStorageService: SessionStorageService,
  ) {
    this.otpForm = this._formDataService.otpForm;
    this.otpNotifySMSForm = this._formDataService.otpNotifySMSForm;
    this.otpNotifyEMAILForm = this._formDataService.otpNotifyEMAILForm;
  }

  ngOnInit(): void {
    const workflowCreateStep4 = this._sessionStorageService.getItem<IValuesStep4>('workflow-create-step-4')
    if (workflowCreateStep4) this.mapValuesForm(workflowCreateStep4)
  }

  private mapValuesForm(workflowCreateStep4: IValuesStep4) {

    this.otpForm.patchValue(workflowCreateStep4.formOTP);
    this.otpNotifySMSForm.patchValue(workflowCreateStep4.formOTPNotifySMS);
    this.otpNotifyEMAILForm.patchValue(workflowCreateStep4.formOTPNotifyEMAIL);
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  nextStep() {

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de la notificación por sms',
        life: 5000
      });
      return;
    }

    if (this.otpNotifySMSForm.invalid) {
      this.otpNotifySMSForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de la notificación por sms',
        life: 5000
      });
      return;
    }

    if (this.otpNotifyEMAILForm.invalid) {
      this.otpNotifyEMAILForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de la notificación por sms',
        life: 5000
      });
      return;
    }

    const valuesStep: unknown = {
      formOTP: this.otpForm.value,
      formOTPNotifySMS: this.otpNotifySMSForm.value,
      formOTPNotifyEMAIL: this.otpNotifyEMAILForm.value,
    }

    this._sessionStorageService.setItem(
      'workflow-create-step-4', valuesStep as IValuesStep4
    )

    this._router.navigateByUrl('/workflow/create/reminder-signers');
  }

  protected readonly languages = languages;
}
