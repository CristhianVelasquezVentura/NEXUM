import {Document} from "@app/core/models/document"

export interface Documents {
  name: string;
  key: string;
}

export interface Annexes {
  name: string;
  isRequired: boolean;
}

export interface ImgLogo {
  name: string;
  value: string;
  extension: string;
}

export interface valueAttributes {
  text: string;
  attribute: string;
}

export interface basicObject {
  type: string;
  value: string;
}

export interface DtoWorkflow {
  name: string;
  sender_name: string;
  sender_email: string;
  sender_cellphone: string;
  id_language: number;
  document_expiration: string;
  id_expiration_frequency: number;
  url_page_redirect: string;
  url_api_redirect: string;
  logo_path: string;
  id_body_font: number;
  id_body_font_size: number;
  body_color_bg: string;
  body_color_font: string;
  id_button_font: number;
  button_color_font: string;
  button_color_bg: string;
  id_button_font_size: number;
  email_notice_to_signer: DtoEmailNoticeToSigner;
  sms_notices_to_signers: DtoSmsNoticesToSigners;
  attached_document: DtoAttachedDocument[];
  requested_documents: DtoRequestedDocuments[];
  notifications_email: DtoNotificationsEmail;
  notifications_sms: DtoNotificationsSms;
  signature_appearance: DtoSignatureAppearance;
  roles_signers: DtoRolesSigners[];
  otp: DtoOtp;
}

export interface DtoEmailNoticeToSigner {
  active: boolean;
  frequency_reminder: number;
  id_frequency: number;
  subject: string;
  text: string;
  bcc: string;
  cc: string;
}

export interface DtoAttachedDocument {
  doctype_name: string;
  required: boolean;
}

export interface DtoNoticesToSigners {
  active: boolean;
  frequency_reminder: number;
  id_frequency: number;
  subject: string;
  text: string;
  bcc: string;
  cc: string;
  id_user: number;
}

export interface DtoNotificationsEmail {
  active: boolean;
  subject: string;
  cc: string;
  bcc: string;
  text: string;
  reminder: boolean;
}

export interface DtoNotificationsSms {
  active: boolean;
  text: string;
  reminder: boolean;
}

export interface DtoRequestedDocuments {
  doctype_name: string;
  required: boolean;
}

export interface DtoRolesSigners {
  name: string;
}

export interface DtoSignatureAppearance {
  color: string;
  color_text: string;
  id_font: number;
  include_names: boolean;
  include_id_number: boolean;
  include_role: boolean;
  include_initials: boolean;
  include_rubric: boolean;
}

export interface DtoSmsNoticesToSigners {
  active: boolean;
  frequency_reminder: number;
  id_frequency: number;
  text: string;
}

export interface DtoOtp {
  characters: number;
  attempts: number;
  id_issues_code: number;
  ttl: number;
  id_frequency_time: number;
  otp_notifications_email: DtoOtpNotificationsEmail;
  otp_notifications_sms: DtoOtpNotificationsSms;
}

export interface DtoOtpNotificationsEmail {
  active_email: boolean;
  subject: string;
  text: string;
}

export interface DtoOtpNotificationsSms {
  active_sms: boolean;
  text: string;
}

export interface ResponseWorkflow {
  error: boolean;
  data: Workflow;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseSigners {
  error: boolean;
  data: Signers;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseGenerateOtp {
  error: boolean;
  data: boolean;
  code: number;
  type: string;
  msg: string;
}

export interface Signers {
  id: number;
  id_section: number;
  id_user_related: number;
  email: string;
  names: string;
  lastnames: string;
  role: string;
  cellphone: string;
  id_identification_type: number;
  identification_number: string;
  access_code_is_required: boolean;
  start_email_notification: boolean;
  start_sms_notification: boolean;
  otp_at_start_signature: boolean;
  id_user: number;
  fecha_firma: string;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseDocumentById {
  error: boolean;
  data: Document;
  code: number;
  type: string;
  msg: string;
}

export interface Sections {
  id: number;
  id_document: number;
  id_user: number;
  is_completed: number;
  level: number;
  min_signatures: number;
  signers?: Signers[];
  created_at: string;
  updated_at: string;
}

export interface ResponseFilesByDocumentId {
  error: boolean;
  data: FileDocument[];
  code: number;
  type: string;
  msg: string;
}

export interface FileDocument {
  name_document: string;
  encoding: string;
  file_id: number;
  active: boolean;
  type: string;
}

export interface DocumentMine {
  name: string;
  type: string;
  src: string;
}


export interface ResponseSignersId {
  error: boolean;
  data: SignersId;
  code: number;
  type: string;
  msg: string;
}

export interface SignersId {
  id: number;
  id_section: number;
  id_user_related: number;
  email: string;
  names: string;
  lastnames: string;
  role: string;
  cellphone: string;
  id_identification_type: number;
  identification_number: string;
  access_code: string;
  id_user: number;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseGetWorkflow {
  error: boolean;
  data: Workflow[];
  code: number;
  type: string;
  msg: string;
}

export interface Workflow {
  id: number;
  name: string;
  sender_name: string;
  sender_email: string;
  sender_zip_code: string;
  sender_cellphone: string;
  id_language: number;
  document_expiration: string;
  id_expiration_frequency: number;
  url_page_redirect: string;
  url_api_redirect: string;
  logo_path: string;
  id_body_font: number;
  id_body_font_size: number;
  body_color_bg: string;
  body_color_font: string;
  id_button_font: number;
  button_color_font: string;
  button_color_bg: string;
  id_button_font_size: number;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface IRoleSigner {
  name: string;
}

export interface ResponseSignatureAppearance {
  error: boolean;
  data: SignatureAppearance;
  code: number;
  type: string;
  msg: string;
}

export interface SignatureAppearance {
  id: number;
  id_workflow: number;
  color: string;
  color_text: string;
  id_font: number;
  include_names: boolean;
  include_id_number: boolean;
  include_role: boolean;
  include_initials: boolean;
  include_rubric: boolean;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseGetRolesSigners {
  error: boolean;
  data: RoleSigner[];
  code: number;
  type: string;
  msg: string;
}

export interface RoleSigner {
  id: number;
  id_workflow: number;
  name: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseEmailNoticeToSigner {
  error: boolean;
  data: EmailNoticeToSigner;
  code: number;
  type: string;
  msg: string;
}

export interface EmailNoticeToSigner {
  id: number;
  id_workflow: number;
  active: boolean;
  frequency_reminder: number;
  id_frequency: number;
  subject: string;
  text: string;
  bcc: string;
  cc: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseSmsNoticeToSigner {
  error: boolean;
  data: SmsNoticeToSigner;
  code: number;
  type: string;
  msg: string;
}

export interface SmsNoticeToSigner {
  id: number;
  id_workflow: number;
  active: boolean;
  frequency_reminder: number;
  id_frequency: number;
  text: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseOtp {
  error: boolean;
  data: Otp;
  code: number;
  type: string;
  msg: string;
}

export interface Otp {
  id: number;
  id_workflow: number;
  characters: number;
  attempts: number;
  id_issues_code: number;
  ttl: number;
  id_frequency_time: number;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseOtpNotificationEmail {
  error: boolean;
  data: OtpNotificationEmail;
  code: number;
  type: string;
  msg: string;
}

export interface OtpNotificationEmail {
  id: number;
  id_otp: number;
  active_email: boolean;
  subject: string;
  text: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseOtpNotificationSms {
  error: boolean;
  data: OtpNotificationSms;
  code: number;
  type: string;
  msg: string;
}

export interface OtpNotificationSms {
  id: number;
  id_otp: number;
  active_sms: boolean;
  text: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseAttachedDocument {
  error: boolean;
  data: AttachedDocument[];
  code: number;
  type: string;
  msg: string;
}

export interface AttachedDocument {
  id: number;
  id_workflow: number;
  doctype_name: string;
  required: boolean;
  id_user: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseRequestedDocument {
  error: boolean;
  data: RequestedDocument[];
  code: number;
  type: string;
  msg: string;
}

export interface RequestedDocument {
  id: number;
  id_workflow: number;
  doctype_name: string;
  required: boolean;
  id_user: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseNotificationSms {
  error: boolean;
  data: NotificationSms;
  code: number;
  type: string;
  msg: string;
}

export interface NotificationSms {
  id: number;
  id_workflow: number;
  active: boolean;
  text: string;
  reminder: boolean;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseNotificationEmail {
  error: boolean;
  data: NotificationEmail;
  code: number;
  type: string;
  msg: string;
}

export interface NotificationEmail {
  id: number;
  id_workflow: number;
  active: boolean;
  subject: string;
  cc: string;
  bcc: string;
  text: string;
  reminder: boolean;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export interface ResponseGetUserById {
  error: boolean;
  data: UserModel;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseUpdate {
  error: boolean;
  data: string;
  code: number;
  type: string;
  msg: string;
}

export interface RequestUpdatePhoto {
  fileEncode: string;
  fileName: string;
}

export interface RequestChangePassword {
  user_id: number;
  password: string;
  confirm_password: string;
  old_password: string;
}

export interface UserModel {
  id: number;
  nickname: string;
  name: string;
  lastname: string;
  id_type: number;
  id_number: string;
  id_city: number;
  email: string;
  cellphone: string;
  status_id: number;
  credit: number;
  full_path_photo?: string;
  real_ip?: string;
  birth_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface ResponseValidateDocument {
  error: boolean;
  data: any;
  code: number;
  type: string;
  msg: string;
}
