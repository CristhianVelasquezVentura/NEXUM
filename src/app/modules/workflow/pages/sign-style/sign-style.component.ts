import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormWorkflowService } from '@app/core/forms/workflow/form-workflow.service';
import { fontText } from '@app/core/utils/data/constant';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf, NgIf} from "@angular/common";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {ToastComponent} from "@app/public/toast/toast.component";
import {ToastService} from "@app/public/services/toast/toast.service";
import {IFormStyleSignStep2} from "@app/core/models/workflow/workflow.model";

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

  formStyleFirm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _formService: FormWorkflowService,
    private _messageService: ToastService,
    private _router: Router
  ) {
    this.formStyleFirm = this._formService.signStyleForm;
  }
  ngOnInit() {
    if (sessionStorage.getItem('signStyle')) {
      this.mapValuesForm()
    }
  }

  private mapValuesForm() {

    const styleSignInfoJSON = sessionStorage.getItem('signStyle')
    const valuesForm: IFormStyleSignStep2 = JSON.parse(styleSignInfoJSON!)
    this.formStyleFirm.patchValue(valuesForm);

  }

  public async nextStep() {
    if (this.formStyleFirm.invalid) {
      this.formStyleFirm.markAllAsTouched()
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente',
        life: 5000,
      });
      return;
    }

    sessionStorage.setItem(
      'signStyle',
      JSON.stringify(this.formStyleFirm.value)
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
