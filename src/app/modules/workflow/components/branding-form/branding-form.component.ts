import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {fontText} from "@app/core/utils/data/constant";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {IFormBrand, IFormBrandValues} from "@app/core/forms/workflow/form-workflow.model";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {IValuesStep1} from "@app/core/models/workflow/workflow-create.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";

@Component({
    selector: 'workflow-branding-form',
    templateUrl: './branding-form.component.html',
    styleUrls: ['./branding-form.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
    standalone: true,
})
export class BrandingFormComponent implements OnInit {
    public formBrand: FormGroup<IFormBrand>;

    protected readonly fontText = fontText;
    public logo: FileList = new DataTransfer().files;

    constructor(
        private _formService: FormWorkflowService,
        private _sessionStorageService: SessionStorageService) {
        this.formBrand = this._formService.brandingForm
    }

    ngOnInit() {

        const workflowCreateStep1 = this._sessionStorageService.getItem<IValuesStep1>('workflow-create-step-1')
        if (workflowCreateStep1?.formBranding) this.mapValuesForm(workflowCreateStep1.formBranding)
    }

    private mapValuesForm(formBrandValues: IFormBrandValues) {

        this.formBrand.patchValue(formBrandValues);
    }

    onChangeLogo(target: any) {

        if (!target.files.length) return

        this.logo = target.files;

        const reader = new FileReader()
        reader.onload = this.bindLoadBrand.bind(this)
        reader.readAsDataURL(this.logo[0]);
    }

    private bindLoadBrand(file: ProgressEvent<FileReader>) {
        if (typeof file?.target?.result === "string") {
            this.formBrand.controls.logo_path.setValue(file?.target.result)
        }
    }

    public isErrorControl(formControl: AbstractControl) {
        return formControl.invalid && formControl.touched
    }

    public getError(formControl: AbstractControl) {
        return getFormControlError(formControl)
    }

}
