import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {codeCountries, fontText, languages, time} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {Annexes} from "@app/modules/workflow/models/steps";
import {ToastService} from "@app/public/services/toast/toast.service";
import {ToastComponent} from "@app/public/toast/toast.component";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IFormBasicDataValues, IValuesStep1} from "@app/core/models/workflow/workflow.model";

@Component({
    selector: 'workflow-basic-data-form',
    templateUrl: './basic-data-form.component.html',
    styleUrls: ['./basic-data-form.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToastComponent],
    providers: [ToastService]
})
export class BasicDataFormComponent implements OnInit {
    public generalInfoForm: FormGroup;
    public annexesForm: FormGroup;
    public annexes: Annexes[] = [];
    public showAddRequest: boolean = false;

    protected readonly fontText = fontText;


    protected readonly codeCountries = codeCountries;
    protected readonly languages = languages;
    public readonly timeData = time;

    constructor(
        private _formService: FormWorkflowService,
        private _messageService: ToastService,
        private _sessionStorageService: SessionStorageService,
    ) {
        this.generalInfoForm = this._formService.generalInfoForm;
        this.annexesForm = this._formService.annexesForm;
    }

    ngOnInit() {

        const workflowCreateStep1 = this._sessionStorageService.getItem<IValuesStep1>('workflow-create-step-1')
        if (workflowCreateStep1?.formBasic) this.mapValuesForm(workflowCreateStep1.formBasic)
    }

    private mapValuesForm(generalInfoFormValues: IFormBasicDataValues) {

        this.generalInfoForm.patchValue(generalInfoFormValues);
        this.annexes = generalInfoFormValues.attached_document;
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }

    public setShowAddRequest(value: boolean) {
        this.showAddRequest = value;
    }

    public cancelFormAnnexe() {
        this.showAddRequest = false;
        this.annexesForm.reset()
    }

    public onChangeIsRequiredAnnexe(index: number, target: any) {
        this.annexes[index].isRequired = target.checked;
        this._formService.attachedDocuments[index].isRequired = target.checked;
    }

    public addAnnexe(): void {
        if (this.annexesForm.invalid) {
            this.annexesForm.markAllAsTouched()
            this._messageService.add({
                type: 'warning',
                message: 'Complete todos los campos correctamente del Anexo!',
                life: 5000
            })
            return;
        }

        this.annexes.push(this.annexesForm.value);
        this._formService.attachedDocuments.push(this.annexesForm.value)
        this.annexesForm.reset();

        this.setShowAddRequest(false);
    }
}
