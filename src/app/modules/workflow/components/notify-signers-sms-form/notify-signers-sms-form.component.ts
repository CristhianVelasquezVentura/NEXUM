import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {codeCountries} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";

@Component({
    selector: 'workflow-notify-signers-sms-form',
    templateUrl: './notify-signers-sms-form.component.html',
    styleUrls: ['./notify-signers-sms-form.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class NotifySignersSmsFormComponent {
    public notifySignersSMSForm: FormGroup;
    public activeSMS: boolean = true;

    protected readonly codeCountries = codeCountries;

    constructor(private _formService: FormWorkflowService) {
        this.notifySignersSMSForm = this._formService.notifySignersSMSForm;
    }

    toggleActiveSMS() {
        this.activeSMS = !this.activeSMS;
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }
}
