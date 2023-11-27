import { Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";
import {IFormMainData} from "@app/core/forms/send-document/form-send-document.model";

@Injectable({
    providedIn: 'root',
})

export class FormSendDocumentService {

    public generalInfoForm = this.initGeneralInfoForm()

    constructor() {
    }

    private initGeneralInfoForm() {
        return new FormGroup<IFormMainData>({
            workflow_id: new FormControl('', {validators: [NgxValidators.required], nonNullable: true}),
            title: new FormControl('', {validators: [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)], nonNullable: true}),
            description: new FormControl('', {validators: [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(150)], nonNullable: true}),
        })
    };

}
