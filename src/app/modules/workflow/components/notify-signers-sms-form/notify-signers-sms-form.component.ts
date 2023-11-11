import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {codeCountries} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {
  IFormSignerNotifyEMAILValues,
  IFormSignerNotifySMSValues,
  IValuesStep3
} from "@app/core/models/workflow/workflow.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";

@Component({
  selector: 'workflow-notify-signers-sms-form',
  templateUrl: './notify-signers-sms-form.component.html',
  styleUrls: ['./notify-signers-sms-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class NotifySignersSmsFormComponent {
  public notifySignersSMSForm: FormGroup;

  protected readonly codeCountries = codeCountries;

  constructor(
    private _formService: FormWorkflowService,
    private _sessionStorageService: SessionStorageService,
  ) {
    this.notifySignersSMSForm = this._formService.notifySignersSMSForm;
  }

  ngOnInit() {

    const workflowCreateStep3 = this._sessionStorageService.getItem<IValuesStep3>('workflow-create-step-3')
    if (workflowCreateStep3?.formSignerNotifySMS) this.mapValuesForm(workflowCreateStep3.formSignerNotifySMS)
  }

  private mapValuesForm(generalSignerNotifySMSValues: IFormSignerNotifySMSValues) {

    this.notifySignersSMSForm.patchValue(generalSignerNotifySMSValues);
  }

  public toggleActiveSMS() {
    if (this.notifySignersSMSForm.enabled) this.disableForm()
    else this.enableForm()
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  public enableForm() {
    this.notifySignersSMSForm.enable()
  }

  public disableForm() {
    this.notifySignersSMSForm.disable()
  }
}
