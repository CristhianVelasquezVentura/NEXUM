import {Component, OnInit} from '@angular/core';
import {FormWorkflowService} from '@app/core/forms/workflow/form-workflow.service';
import {ReactiveFormsModule} from '@angular/forms';
import {codeCountries, fontText, languages} from '@app/core/utils/data/constant';
import {Router} from '@angular/router';

import {NgForOf, NgIf} from "@angular/common";
import {ToastComponent} from "@app/public/toast/toast.component";
import {ToastService} from "@app/public/services/toast/toast.service";
import {BasicDataFormComponent, BrandingFormComponent} from "@app/modules/workflow/components";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IValuesStep1} from "@app/core/models/workflow/workflow-create.model";
import {HeaderNexumComponent} from "@app/core/ui";

@Component({
    selector: 'app-general-info-workflow',
    templateUrl: './general-info-workflow.component.html',
    styleUrls: ['./general-info-workflow.component.scss'],
    standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    ToastComponent,
    BasicDataFormComponent,
    BrandingFormComponent,
    HeaderNexumComponent
  ],
    providers: [ToastService],
})
export class GeneralInfoWorkflowComponent implements OnInit {

    public readonly languages = languages;
    public readonly codeCountries = codeCountries;
    public readonly fontText = fontText;

    public showBasicData: boolean = true;

    constructor(
        private _formService: FormWorkflowService,
        private _sessionStorageService: SessionStorageService,
        private _messageService: ToastService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {}

    setShowBasicData(value: boolean) {
        this.showBasicData = value;
    }

    public async nextStep() {

        if (this._formService.generalInfoForm.invalid) {
            this._formService.generalInfoForm.markAllAsTouched();
            this._messageService.add({
                type: 'warning',
                message: 'Complete todos los campos correctamente de datos básicos',
                life: 5000
            });
            this.setShowBasicData(true)
            return;
        }
        if (this._formService.brandingForm.invalid) {
            this._formService.brandingForm.markAllAsTouched();
            this._messageService.add({
                type: 'warning',
                message: 'Complete todos los campos correctamente de branding',
                life: 5000
            });
            this.setShowBasicData(false)
            return;
        }

        const valuesStep: unknown = {
            formBasic: {
                ...this._formService.generalInfoForm.getRawValue(),
                attached_document: this._formService.attachedDocuments,
                roleSigners: this._formService.roleSigners,
              requested_documents: []
            },
            formBranding: this._formService.brandingForm.getRawValue(),
        }

        this._sessionStorageService.setItem(
            'workflow-create-step-1', valuesStep as IValuesStep1
        )

        await this._router.navigateByUrl("/workflow/create/sign-style")

    }
}
