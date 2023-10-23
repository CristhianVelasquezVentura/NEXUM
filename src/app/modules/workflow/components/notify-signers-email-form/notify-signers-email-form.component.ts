import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {languages} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";

@Component({
    selector: 'workflow-notify-signers-email-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './notify-signers-email-form.component.html',
    styleUrls: ['./notify-signers-email-form.component.scss']
})
export class NotifySignersEmailFormComponent {
    public notifySignersEmailForm:FormGroup;
    public activeEmail: boolean = true;

    protected readonly languages = languages;
    constructor(private _formService: FormWorkflowService) {
        this.notifySignersEmailForm = this._formService.notifySignersEmailForm;
    }

    toggleActiveEmail() {
        this.activeEmail = !this.activeEmail;
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }
}
