import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { codeCountries, languages } from '@app/core/utils/data/constant';
import { FormWorkflowService } from '../../../../core/forms/workflow/form-workflow.service';
import { ToastService } from 'ecapture-ng-ui';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-notify-signers',
  templateUrl: './notify-signers.component.html',
  styleUrls: ['./notify-signers.component.scss'],
  imports: [
    UiModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class NotifySignersComponent implements OnInit  {
  codeCountries=codeCountries;
  languages=languages;
  showEmailOption:boolean=false;
  activeEmail:boolean=true;
  activeSMS:boolean=true;
  notifySignersSMSForm:FormGroup;
  notifySignersEmailForm:FormGroup;
  constructor(    private _fb: FormBuilder,
    private _formService: FormWorkflowService,
    private _messageService: ToastService,
    private _router: Router ){
      this.notifySignersSMSForm = this._formService.notifySignersSMSForm
      this.notifySignersEmailForm = this._formService.notifySignersEmailForm

  }
  ngOnInit(): void {
    const notifySignersSMS_JSON = sessionStorage.getItem('notifySignersSMS');
    if (notifySignersSMS_JSON) {
      const notifySignersSMS = JSON.parse(notifySignersSMS_JSON);
      this.activeSMS = notifySignersSMS.active;
      this.notifySignersSMSForm.patchValue(notifySignersSMS);
    }

    const notifySignersEmailJSON = sessionStorage.getItem('notifySignersEmail');
    if (notifySignersEmailJSON) {
      const notifySignersEmail= JSON.parse(notifySignersEmailJSON);
      this.activeEmail = notifySignersEmail.active;
      this.notifySignersEmailForm.patchValue(notifySignersEmail);
    }
  }
  setShowEmailOption(value: boolean) {
    this.showEmailOption = value;
  }

  toggleActiveSMS(){
    this.activeSMS = !this.activeSMS;
  }
  toggleActiveEmail(){
    this.activeEmail = !this.activeEmail;
  }
  onChangeTextSMS(target:any){
    console.log(target);
  }
  nextStep() {
    console.log({...this.notifySignersSMSForm.value,active:this.activeSMS})
    console.log({...this.notifySignersEmailForm.value,active:this.activeEmail})

    this.saveNotifySignersSMS();
    this.saveNotifySignersEmail();

    this._router.navigateByUrl('/workflow/create/otp-config');
  }
  saveNotifySignersSMS(){

    if (!this.notifySignersSMSForm.valid) {
      console.log('Complete todos los campos correctamente');
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente',
        life: 5000,
      });
      return;
    }

    sessionStorage.setItem(
      'notifySignersSMS',
      JSON.stringify({...this.notifySignersSMSForm.value,active:this.activeSMS})
    );

  }
  saveNotifySignersEmail(){
    if (!this.notifySignersEmailForm.valid) {
      console.log('Complete todos los campos correctamente');
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente',
        life: 5000,
      });
      return;
    }
    sessionStorage.setItem(
      'notifySignersEmail',
      JSON.stringify({...this.notifySignersEmailForm.value,active:this.activeEmail})
    );

  }
}
