import {IRoleSigner} from "@app/modules/workflow/models/steps";
import {FormControl, Validators} from "@angular/forms";
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";

export interface IValuesStep1 {
  formBasic: IFormBasicDataValues;
  formBranding: IFormBrandingValues;
}

export interface IFormBasicDataValues {
  name: string;
  id_language: string;
  document_expiration: number;
  id_expiration_frequency: number;

  sender_name: string;
  sender_email: string;
  sender_cellphone: number;
  sender_cellphone_code: string;

  url_page_redirect: string;
  url_api_redirect: string;

  attached_document: IFormAnnexesStep1[]
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

export interface IFormAnnexesStep1 {
  name: string;
  isRequired: boolean;
}

export interface IFormBrandingValues {
  brand: string;
  body_font: string;
  body_color_font: string;
}

/**
 * STEP 2
 */
export interface IValuesStep2 {
  formStyleSign: IFormStyleSignValues;
}

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

/**
 * STEP 3
 */
export interface IValuesStep3 {
  formSignerNotifySMS: IFormSignerNotifySMSValues;
  formSignerNotifyEMAIL: IFormSignerNotifyEMAILValues;
}

export interface IFormSignerNotifySMSValues {
  title: string,
  sender_name: string,
  sender_cellphone_code: string,
  sender_cellphone: string,
  text: string,
  activate_reminder: boolean
}

export interface IFormSignerNotifyEMAILValues {
  language: string,
  subject: string,
  cc: string,
  bcc: string,
  text: string,
  activate_reminder: boolean,
}
