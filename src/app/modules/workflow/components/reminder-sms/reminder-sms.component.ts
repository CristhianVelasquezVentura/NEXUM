import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {IFormReminderSMS} from "@app/core/forms/workflow/form-workflow.model";
import {languages, timeOptions} from "@app/core/utils/data/constant";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {IFormReminderEMAILValues, IFormReminderSMSValues, IValuesStep5} from "@app/core/models/workflow/workflow.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";

@Component({
    selector: 'workflow-reminder-sms',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reminder-sms.component.html',
    styleUrls: ['./reminder-sms.component.scss']
})
export class ReminderSmsComponent implements OnInit{
    public formReminderSMS: FormGroup<IFormReminderSMS>;

    protected readonly timeOptions = timeOptions;

    constructor(
        private _formService: FormWorkflowService,
        private _sessionStorageService: SessionStorageService,
    ) {
        this.formReminderSMS = this._formService.reminderSMSForm;
    }

    ngOnInit() {

        const workflowCreateStep5 = this._sessionStorageService.getItem<IValuesStep5>('workflow-create-step-5')
        if (workflowCreateStep5?.formReminderSMS) this.mapValuesForm(workflowCreateStep5.formReminderSMS)
    }

    private mapValuesForm(formReminderSMSValues: IFormReminderSMSValues) {

        this.formReminderSMS.patchValue(formReminderSMSValues);

        if (formReminderSMSValues.active) this.formReminderSMS.enable();
        else this.formReminderSMS.disable();

    }

    public toggleActiveForm() {
        const isActive: boolean = !this.formReminderSMS.controls.active.value;

        this.formReminderSMS.controls.active.setValue(isActive)

        if (isActive) this.formReminderSMS.enable();
        else this.formReminderSMS.disable();
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }
}
