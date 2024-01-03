import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";
import {AttachedDocuments, IFormMainData} from "@app/core/forms/send-document/form-send-document.model";
import {RequestedDocument} from "@app/core/models/workflow/workflow.model";
import {IRequestDocument} from "@app/core/components/form-document-request";

@Injectable({
  providedIn: 'root',
})

export class FormSendDocumentService {

  // STEP 1
  public generalInfoForm = this.initGeneralInfoForm();
  public requestedDocument: IRequestDocument[] = [];

  constructor() {
  }

  /**
   * Initializes the general information form.
   *
   * @return {FormGroup<IFormMainData>} - The initialized general information form group.
   */
  private initGeneralInfoForm(): FormGroup<IFormMainData> {
    return new FormGroup<IFormMainData>({
      workflow_id: this.createFormControl(''),
      title: this.createFormControl('', [NgxValidators.minLength(4), NgxValidators.maxLength(50)]),
      description: this.createFormControl('', [NgxValidators.minLength(4), NgxValidators.maxLength(150)]),
      file: this.createFormControl(''),
      attachedDocuments: new FormArray<FormGroup>([]),
    })
  };

  public createFormControl(defaultValue: any, extraValidators?: ValidatorFn[]): FormControl {
    return new FormControl(defaultValue, {
      validators: [NgxValidators.required, ...(extraValidators || [])],
      nonNullable: true
    });
  }

}
