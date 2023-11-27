import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {languages} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {IValuesStep3} from "@app/core/models/workflow/workflow-create.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IFormNotifySignerEMAILValues} from "@app/core/forms/workflow";

@Component({
  selector: 'workflow-notify-signers-email-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notify-signers-email-form.component.html',
  styleUrls: ['./notify-signers-email-form.component.scss']
})
export class NotifySignersEmailFormComponent {
  public notifySignersEmailForm: FormGroup;

  protected readonly languages = languages;

  constructor(
    private _formService: FormWorkflowService,
    private _sessionStorageService: SessionStorageService,
  ) {
    this.notifySignersEmailForm = this._formService.notifySignersEmailForm;
  }

  ngOnInit() {

    const workflowCreateStep3 = this._sessionStorageService.getItem<IValuesStep3>('workflow-create-step-3')
    if (workflowCreateStep3?.formSignerNotifyEMAIL) this.mapValuesForm(workflowCreateStep3.formSignerNotifyEMAIL)
  }

  private mapValuesForm(generalSignerNotifyEMAILValues: IFormNotifySignerEMAILValues) {

    this.notifySignersEmailForm.patchValue(generalSignerNotifyEMAILValues);
  }

  toggleActiveEmail() {
    if (this.notifySignersEmailForm.enabled) this.disableForm()
    else this.enableForm()
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  public enableForm() {
    this.notifySignersEmailForm.enable()
  }

  public disableForm() {
    this.notifySignersEmailForm.disable()
  }
}
