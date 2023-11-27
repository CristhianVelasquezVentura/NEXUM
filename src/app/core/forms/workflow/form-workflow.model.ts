import {FormControl} from "@angular/forms";
import {IRoleSigner} from "@app/modules/workflow/models/steps";
import {IFormAnnexesStep1} from "@app/core/models/workflow/workflow-create.model";

export interface IFormBasicDataValues {
  name: string;
  id_language: number;
  document_expiration: number;
  id_expiration_frequency: number;

  sender_name: string;
  sender_email: string;
  sender_cellphone: number;
  sender_cellphone_code: string;

  url_page_redirect: string;
  url_api_redirect: string;

  attached_document: IFormAnnexesStep1[]
  requested_documents: IFormAnnexesStep1[]
  roleSigners: IRoleSigner[]

  //logo_path: string;
  //id_body_font: number;
  //id_body_font_size: number;
  //body_color_bg: string;
  //body_color_font: string;
  //id_button_font: number;
  //button_color_font: string;
  //button_color_bg: string;
  //id_button_font_size: number;
  //email_notice_to_signer: DtoEmailNoticeToSigner;
  //sms_notices_to_signers: DtoSmsNoticesToSigners;
  //attached_document: DtoAttachedDocument[];
  //requested_documents: DtoRequestedDocuments[];
}

export interface IFormBrand {
  logo_path: FormControl<string>;
  body_color_font: FormControl<string>;
  id_body_font: FormControl<number>;
}

export interface IFormBrandValues {
  logo_path: string;
  id_body_font: number;
  body_color_font: string;
}

//  STEP 2

export interface IFormStyleSignValues {
  color: string;
  color_text: string;
  id_font: number;
  include_names: boolean;
  include_id_number: boolean;
  include_role: boolean;
  include_initials: boolean;
  include_rubric: boolean;
}

// STEP 3

export interface IFormNotifySignerSMS {
  title: FormControl<string>,
  sender_name: FormControl<string>,
  sender_cellphone_code: FormControl<string>,
  sender_cellphone: FormControl<string>,
  text: FormControl<string>,
  activate_reminder: FormControl<boolean>,
}

export interface IFormNotifySignerSMSValues {
  title: string,
  sender_name: string,
  sender_cellphone_code: string,
  sender_cellphone: string,
  text: string,
  activate_reminder: boolean
}

export interface IFormNotifySignerEMAIL {
  language: FormControl<string>,
  subject: FormControl<string>,
  cc: FormControl<string>,
  bcc: FormControl<string>,
  text: FormControl<string>,
  activate_reminder: FormControl<boolean>,
}

export interface IFormNotifySignerEMAILValues {
  language: string,
  subject: string,
  cc: string,
  bcc: string,
  text: string,
  activate_reminder: boolean,
}

// STEP 4

export interface IFormOTP {
  characters: FormControl<number>,
  attempts: FormControl<number>,
  ttl: FormControl<number>,
  id_frequency_time: FormControl<number>,
  id_issues_code: FormControl<number>,
}

export interface IFormOTPValues {
  characters: number,
  attempts: number,
  ttl: number,
  id_frequency_time: number,
  id_issues_code: number,
}

export interface IFormOTPNotifyEMAIL {
  active_email: FormControl<boolean>,
  subject: FormControl<string>,
  text: FormControl<string>,
}

export interface IFormOTPNotifyEMAILValues {
  active_email: number,
  subject: string,
  text: string,
}

export interface IFormOTPNotifySMS {
  active_sms: FormControl<boolean>,
  text: FormControl<string>,
}

export interface IFormOTPNotifySMSValues {
  active_sms: number,
  text: string,
}

/**
 * STEP 5
 */

export interface IFormReminderSMS {
  active: FormControl<boolean>,
  frequency_reminder: FormControl<number>,
  id_frequency: FormControl<number>,
  text: FormControl<string>,
}

export interface IFormReminderSMSValues {
  active: boolean,
  frequency_reminder: number,
  id_frequency: number,
  text: string,
}

export interface IFormReminderEMAIL {
  active: FormControl<boolean>,
  frequency_reminder: FormControl<number>,
  id_frequency: FormControl<number>,
  subject: FormControl<string>,
  text: FormControl<string>,
  bcc: FormControl<string>,
  cc: FormControl<string>,
}

export interface IFormReminderEMAILValues {
  active: boolean,
  frequency_reminder: number,
  id_frequency: number,
  subject: string,
  cc: string,
  bcc: string,
  text: string,
}
