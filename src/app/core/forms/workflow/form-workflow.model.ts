import {FormControl} from "@angular/forms";

export interface IFormBrand {
  brand: FormControl<string>;
  body_font: FormControl<string>;
  body_color_font: FormControl<string>;
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
