import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormDataWorkflowService } from '../../services/form-data-workflow.service';
import { ToastService } from 'ecapture-ng-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-config',
  templateUrl: './otp-config.component.html',
  styleUrls: ['./otp-config.component.scss']
})
export class OtpConfigComponent implements OnInit {
  otpForm:FormGroup;
constructor(  private _fb: FormBuilder,
  private formDataService: FormDataWorkflowService,    
  private _messageService: ToastService,
  private _router: Router){
    this.otpForm = _fb.group(formDataService.OtpFormControl);
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
