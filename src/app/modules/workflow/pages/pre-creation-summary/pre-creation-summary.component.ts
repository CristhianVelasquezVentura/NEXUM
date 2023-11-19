import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterLink} from "@angular/router";
import {DtoWorkflow} from "@app/modules/workflow/models/steps";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {
  IFormAnnexesStep1,
  IValuesStep1,
  IValuesStep2,
  IValuesStep3,
  IValuesStep4,
  IValuesStep5
} from "@app/core/models/workflow/workflow.model";
import {WorkflowService} from "@app/modules/workflow/services/workflow.service";
import {ToastService} from "@app/public/services/toast/toast.service";
import {ToastComponent} from "@app/public/toast/toast.component";
import {HeaderNexumComponent} from "@app/core/ui";

@Component({
  selector: 'workflow-pre-creation-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, ToastComponent, HeaderNexumComponent],
  templateUrl: './pre-creation-summary.component.html',
  styleUrls: ['./pre-creation-summary.component.scss'],
  providers: [ToastService]
})
export class PreCreationSummaryComponent {
  public workflowRequest: DtoWorkflow = {} as DtoWorkflow;

  public valueStep1: IValuesStep1 = {} as IValuesStep1;
  public valueStep2: IValuesStep2 = {} as IValuesStep2;
  public valueStep3: IValuesStep3 = {} as IValuesStep3;
  public valueStep4: IValuesStep4 = {} as IValuesStep4;
  public valueStep5: IValuesStep5 = {} as IValuesStep5;
  public isBlocked: boolean = false;

  constructor(
    private _workflowService: WorkflowService,
    private _sessionStorage: SessionStorageService,
    private _messageService: ToastService,
  ) {
    this.valueStep1 = this._sessionStorage.getItem<IValuesStep1>('workflow-create-step-1')!;
    this.valueStep2 = this._sessionStorage.getItem<IValuesStep2>('workflow-create-step-2')!;
    this.valueStep3 = this._sessionStorage.getItem<IValuesStep3>('workflow-create-step-3')!;
    this.valueStep4 = this._sessionStorage.getItem<IValuesStep4>('workflow-create-step-4')!;
    this.valueStep5 = this._sessionStorage.getItem<IValuesStep5>('workflow-create-step-5')!;

    this.buildRequestCreation()
  }

  private buildRequestCreation() {
    /**
     * BUILD REQUEST STEP 1: INFO BASIC
     */
    this.workflowRequest = {
      name: this.valueStep1.formBasic.name,
      id_language: this.valueStep1.formBasic.id_language,
      document_expiration: this.valueStep1.formBasic.document_expiration.toString(),
      id_expiration_frequency: this.valueStep1.formBasic.id_expiration_frequency,
      sender_name: this.valueStep1.formBasic.sender_name,
      sender_email: this.valueStep1.formBasic.sender_email,
      sender_cellphone: this.valueStep1.formBasic.sender_cellphone_code + this.valueStep1.formBasic.sender_cellphone,
      url_page_redirect: this.valueStep1.formBasic.url_page_redirect,
      url_api_redirect: this.valueStep1.formBasic.url_api_redirect,
      attached_document: this.valueStep1.formBasic.attached_document,
      requested_documents: [] as IFormAnnexesStep1[],
    } as DtoWorkflow;


    /**
     * BUILD REQUEST STEP 1: BRANDING
     */

    this.workflowRequest = {
      ...this.workflowRequest,
      logo_path: this.valueStep1.formBranding.logo_path.split(',')[1],
      id_body_font: this.valueStep1.formBranding.id_body_font,
      id_body_font_size: 3,
      body_color_bg: '',
      body_color_font: this.valueStep1.formBranding.body_color_font,
      id_button_font: 0,
      button_color_font: '',
      button_color_bg: '',
      id_button_font_size: 3,
    }

    /**
     * BUILD REQUEST STEP 2: STYLE SIGNATURE
     */

    this.workflowRequest.signature_appearance = this.valueStep2.formStyleSign

    /**
     * let roles = [];
     *     if (this.signatureAppearance.hasOwnProperty('roles') && this.signatureAppearance.includeRol) {
     *       roles = this.signatureAppearance.roles;
     *     }
     */

    /**
     * BUILD REQUEST STEP 3: NOTIFY SIGNERS
     */

    this.workflowRequest.notifications_sms = {
      active: true,
      text: this.valueStep3.formSignerNotifySMS.text,
      reminder: this.valueStep3.formSignerNotifySMS.activate_reminder
    }

    this.workflowRequest.notifications_email = {
      active: true,
      text: this.valueStep3.formSignerNotifyEMAIL.text,
      subject: this.valueStep3.formSignerNotifyEMAIL.subject,
      cc: this.valueStep3.formSignerNotifyEMAIL.cc,
      bcc: this.valueStep3.formSignerNotifyEMAIL.bcc,
      reminder: this.valueStep3.formSignerNotifyEMAIL.activate_reminder
    }

    /**
     * BUILD REQUEST STEP 4: OTP
     */

    this.workflowRequest.otp = {
      ...this.valueStep4.formOTP,
      otp_notifications_sms: this.valueStep4.formOTPNotifySMS,
      otp_notifications_email: this.valueStep4.formOTPNotifyEMAIL,
    }

    /**
     * BUILD REQUEST STEP 5: REMINDER SIGNER
     */

    this.workflowRequest.sms_notices_to_signers = this.valueStep5.formReminderSMS
    this.workflowRequest.email_notice_to_signer = this.valueStep5.formReminderEMAIL
  }

  public createWorkflow() {
    this.isBlocked = true;
    this._workflowService.createWorkflow(this.workflowRequest).subscribe({
      next: (response) => {
        this.isBlocked = false;
        if (response.error || response.code !== 29) {
          this._messageService.add({type: 'error', message: response.msg, life: 5000});
          return
        }

        this._messageService.add({type: 'success', message: 'Flujo creado correctamente', life: 5000});
      }
    })
  }
}
