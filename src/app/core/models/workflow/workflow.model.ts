import {IRoleSigner} from "@app/modules/workflow/models/steps";

export interface IValuesStep1 {
    formBasic: IFormBasicDataValues;
    formBranding: IFormBrandingValues;
}

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

export interface IFormAnnexesStep1 {
    doctype_name: string;
    required: boolean;
}

export interface IFormBrandingValues {
    logo_path: string;
    id_body_font: number;
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

/**
 * STEP 4
 */
export interface IValuesStep4 {
    formOTP: IFormOTPValues;
    formOTPNotifySMS: IFormOTPNotifySMSValues;
    formOTPNotifyEMAIL: IFormOTPNotifyEMAILValues;
}

export interface IFormOTPValues {
    characters: number,
    attempts: number,
    ttl: number,
    id_frequency_time: number,
    id_issues_code: number,
}

export interface IFormOTPNotifySMSValues {
    active_sms: number,
    text: string,
}

export interface IFormOTPNotifyEMAILValues {
    active_email: number,
    subject: string,
    text: string,
}

/**
 * STEP 5
 */
export interface IValuesStep5 {
    formReminderSMS: IFormReminderSMSValues;
    formReminderEMAIL: IFormReminderEMAILValues;
}

export interface IFormReminderSMSValues {
    active: boolean,
    frequency_reminder: number,
    id_frequency: number,
    text: string,
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
