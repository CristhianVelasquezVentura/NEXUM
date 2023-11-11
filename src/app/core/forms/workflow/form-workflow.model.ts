import {FormControl} from "@angular/forms";

export interface IFormBrand {
  logo_path: FormControl<string>;
  body_color_font: FormControl<string>;
  id_body_font: FormControl<number>;
}

export interface IFormNotifySignerSMS {
  title: FormControl<string>,
  sender_name: FormControl<string>,
  sender_cellphone_code: FormControl<string>,
  sender_cellphone: FormControl<string>,
  text: FormControl<string>,
  activate_reminder: FormControl<boolean>,
}

export interface IFormNotifySignerEMAIL {
  language: FormControl<string>,
  subject: FormControl<string>,
  cc: FormControl<string>,
  bcc: FormControl<string>,
  text: FormControl<string>,
  activate_reminder: FormControl<boolean>,
}

export interface IFormOTP {
  characters: FormControl<number>,
  attempts: FormControl<number>,
  ttl: FormControl<number>,
  id_frequency_time: FormControl<number>,
  id_issues_code: FormControl<number>,
}

export interface IFormOTPNotifyEMAIL {
  active_email: FormControl<boolean>,
  subject: FormControl<string>,
  text: FormControl<string>,
}

export interface IFormOTPNotifySMS {
  active_sms: FormControl<boolean>,
  text: FormControl<string>,
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
export interface IFormReminderEMAIL {
  active: FormControl<boolean>,
  frequency_reminder: FormControl<number>,
  id_frequency: FormControl<number>,
  subject: FormControl<string>,
  text: FormControl<string>,
  bcc: FormControl<string>,
  cc: FormControl<string>,
}
