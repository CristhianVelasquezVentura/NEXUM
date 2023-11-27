import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {
  IFormReminderEMAIL,
  IFormReminderEMAILValues,
  IFormReminderSMS
} from "@app/core/forms/workflow/form-workflow.model";
import {timeOptions} from "@app/core/utils/data/constant";
import {
  IValuesStep3,
  IValuesStep5
} from "@app/core/models/workflow/workflow-create.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";

@Component({
  selector: 'workflow-reminder-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reminder-email.component.html',
  styleUrls: ['./reminder-email.component.scss']
})
export class ReminderEmailComponent implements OnInit {
  public formReminderEMAIL: FormGroup<IFormReminderEMAIL>;

  constructor(
    private _formService: FormWorkflowService,
    private _sessionStorageService: SessionStorageService,
  ) {
    this.formReminderEMAIL = this._formService.reminderEMAILForm;
  }

  ngOnInit() {

    const workflowCreateStep5 = this._sessionStorageService.getItem<IValuesStep5>('workflow-create-step-5')
    if (workflowCreateStep5?.formReminderEMAIL) this.mapValuesForm(workflowCreateStep5.formReminderEMAIL)
  }

  private mapValuesForm(formReminderEMAILValues: IFormReminderEMAILValues) {

    this.formReminderEMAIL.patchValue(formReminderEMAILValues);

    if (formReminderEMAILValues.active) this.formReminderEMAIL.enable();
    else this.formReminderEMAIL.disable();
  }

  public toggleActiveForm() {
    const isActive: boolean = !this.formReminderEMAIL.controls.active.value;

    this.formReminderEMAIL.controls.active.setValue(isActive)

    if (isActive) this.formReminderEMAIL.enable();
    else this.formReminderEMAIL.disable();
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  protected readonly timeOptions = timeOptions;
}
