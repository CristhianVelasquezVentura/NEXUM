export interface ResponseSignersId {
  error: boolean;
  data: Signer;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseSigners {
  error: boolean;
  data: Signer;
  code: number;
  type: string;
  msg: string;
}

export interface Signer {
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
  access_code_is_required?: boolean;
  start_email_notification?: boolean;
  start_sms_notification?: boolean;
  otp_at_start_signature?: boolean;
  fecha_firma?: string;
  access_code: string;
  id_user: number;
  created_at: Date;
  updated_at: Date;
}

export interface Signature {
  id_signer: number;
  file_signature: string;
  encode: string;
  document_id: number;
}

