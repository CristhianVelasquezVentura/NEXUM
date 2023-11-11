import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormWorkflowService} from '@app/core/forms/workflow/form-workflow.service';
import {fontText} from '@app/core/utils/data/constant';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf, NgIf} from "@angular/common";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {ToastComponent} from "@app/public/toast/toast.component";
import {ToastService} from "@app/public/services/toast/toast.service";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IFormStyleSignValues, IValuesStep2} from "@app/core/models/workflow/workflow.model";

@Component({
    selector: 'app-sign-style',
    templateUrl: './sign-style.component.html',
    styleUrls: ['./sign-style.component.scss'],
    standalone: true,
    imports: [
        UiModule,
        ReactiveFormsModule,
        RouterLink,
        NgForOf,
        NgIf,
        ToastComponent
    ],
    providers: [ToastService]
})
export class SignStyleComponent implements OnInit {
    public readonly fontText = fontText;

    formStyleSign: FormGroup;

    constructor(
        private _sessionStorageService: SessionStorageService,
        private _formService: FormWorkflowService,
        private _messageService: ToastService,
        private _router: Router
    ) {
        this.formStyleSign = this._formService.signStyleForm;
    }

    ngOnInit() {

        const workflowCreateStep2 = this._sessionStorageService.getItem<IValuesStep2>('workflow-create-step-2')
        if (workflowCreateStep2?.formStyleSign) this.mapValuesForm(workflowCreateStep2?.formStyleSign)
    }

    private mapValuesForm(formStyleSignValues: IFormStyleSignValues) {

        this.formStyleSign.patchValue(formStyleSignValues);
    }

    public async nextStep() {
        if (this.formStyleSign.invalid) {
            this.formStyleSign.markAllAsTouched()
            this._messageService.add({
                type: 'warning',
                message: 'Complete todos los campos correctamente',
                life: 5000,
            });
            return;
        }

        sessionStorage.setItem(
            'workflow-create-step-2',
            JSON.stringify(this.formStyleSign.value)
        );

        await this._router.navigateByUrl('/workflow/create/notify-signers');
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }
}
