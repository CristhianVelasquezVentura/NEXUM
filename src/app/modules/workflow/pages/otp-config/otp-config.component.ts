import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormWorkflowService } from '../../../../core/forms/workflow/form-workflow.service';
import { ToastService } from 'ecapture-ng-ui';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";

@Component({
  selector: 'app-otp-config',
  templateUrl: './otp-config.component.html',
  styleUrls: ['./otp-config.component.scss'],
  imports: [
    UiModule,
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true
})
export class OtpConfigComponent implements OnInit {
  otpForm:FormGroup;
constructor(  private _fb: FormBuilder,
  private formDataService: FormWorkflowService,
  private _messageService: ToastService,
  private _router: Router){
    this.otpForm = _fb.group(formDataService.initOtpForm);
  }
  ngOnInit(): void {
    const otpFormJSON = sessionStorage.getItem('otpConfig');
    if(otpFormJSON){
      this.otpForm.patchValue(JSON.parse(otpFormJSON));
    }

  }

  nextStep() {
    console.log(this.otpForm.value)
    sessionStorage.setItem('otpConfig', JSON.stringify(this.otpForm.value));
    this._router.navigateByUrl('/workflow/create/finish');
  }
}
