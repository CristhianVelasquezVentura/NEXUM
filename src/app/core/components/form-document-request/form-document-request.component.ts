import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";
import {
  IFormDocumentRequest,
  IRequestDocument
} from "@app/core/components/form-document-request/models/form-document-request.model";
import {ToastService} from "@app/public/services/toast/toast.service";

@Component({
  selector: 'app-form-document-request',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-document-request.component.html',
  styleUrls: ['./form-document-request.component.scss']
})
export class FormDocumentRequestComponent {
  @Output() cancelFormEvent = new EventEmitter<undefined>()
  @Output() saveFormEvent = new EventEmitter<IRequestDocument>()

  public annexesForm: FormGroup<IFormDocumentRequest>;

  constructor(
      private _messageService: ToastService
  ) {
    this.annexesForm = this.getAnnexesForm()
  }

  private getAnnexesForm() {
    return new FormGroup<IFormDocumentRequest>({
      name: new FormControl('', {validators: NgxValidators.required, nonNullable: true}),
      required: new FormControl(false, {validators: NgxValidators.required, nonNullable: true}),
    });
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  public cancelFormAnnexe(){
    this.cancelFormEvent.emit()
  }

  public saveFormAnnexe(){
    if (this.annexesForm.invalid) {
      this.annexesForm.markAllAsTouched()
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente del Anexo!',
        life: 5000
      })
      return;
    }

    this.saveFormEvent.emit(this.annexesForm.getRawValue());
  }
}
