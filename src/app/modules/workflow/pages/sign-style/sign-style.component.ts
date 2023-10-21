import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormDataWorkflowService } from '../../services/form-data-workflow.service';
import { fontText } from '@app/core/utils/data/constant';
import { ToastService } from 'ecapture-ng-ui';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sign-style',
  templateUrl: './sign-style.component.html',
  styleUrls: ['./sign-style.component.scss'],
  imports: [
    UiModule,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  standalone: true
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
