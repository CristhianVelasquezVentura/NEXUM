import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataWorkflowService } from '../../services/form-data-workflow.service';
import { fontText } from '@app/core/utils/data/constant';
import { ToastService } from 'ecapture-ng-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-style',
  templateUrl: './sign-style.component.html',
  styleUrls: ['./sign-style.component.scss'],
})
export class SignStyleComponent implements OnInit {
  public readonly fontText = fontText;

  formStyleFirm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private formDataService: FormDataWorkflowService,
    private _messageService: ToastService,
    private _router: Router
  ) {
    this.formStyleFirm = _fb.group(formDataService.signStyleFormControl);
  }
  ngOnInit(): void {
    const signStyleJSON = sessionStorage.getItem('signStyle');
    if (signStyleJSON) {
      this.formStyleFirm.patchValue(JSON.parse(signStyleJSON));
    }
  }

  nextStep() {
    console.log(this.formStyleFirm.value);

    if (!this.formStyleFirm.valid) {
      console.log('Complete todos los campos correctamente');
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

    this._router.navigateByUrl('/workflow/create/notify-signers');
  }
}
