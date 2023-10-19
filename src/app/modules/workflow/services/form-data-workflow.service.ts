import { Injectable } from '@angular/core';
import { DocInfoStep1 } from '@app/core/models/signature.model';
import { DtoWorkflow } from '../models/steps';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class FormDataWorkflowService {
  generalInfoFormControl={
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    language: ['', Validators.required],
    document_expiration: ['0', Validators.required],
    expiration_frequency: ['Minutos', Validators.required],
    sender_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    sender_email: ['', [Validators.required, Validators.email]],
    sender_cellphone_code: ['', Validators.required],
    sender_cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],

    url_page_redirect: [''],
    url_api_redirect: [''],
    
    body_font: ['', Validators.required],
    body_font_size: ['', Validators.required],
    body_color_bg: ['#000000', Validators.required],
    body_color_font: ['#000000', Validators.required],

    button_font: ['', Validators.required],
    button_font_size: ['', Validators.required],
    button_color_bg: ['#000000', Validators.required],
    button_color_font: ['#000000', Validators.required],
    
  };
  annexesFormControl = {
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    // isRequired:[]
  }
  signStyleFormControl={
    color: ['#000000', Validators.required],
    color_text: ['#000000', Validators.required],
    font: ['', Validators.required],
    include_names: [false],
    include_id_number: [false],
    include_role: [false],
    include_initials: [false],
    include_rubric: [false],
    show_signature_line:[false]
  }
  notifySignersSMSFormControl={
    title:[''],
    sender_name: [''],
    sender_cellphone_code: [''],
    sender_cellphone: [''],
    text:['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
    activate_reminder:[false]
  }
  notifySignersEmailFormControl={
    language:[''],
    subject:[''],
    cc:[''],
    bcc:[''],
    text:['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
    activate_reminder:[false]

  }
  OtpFormControl={
    characters: ['0', Validators.required],
    attempts: ['0', Validators.required],
    ttl: ['0', Validators.required],
    frequency_time: ['Minutos', Validators.required],
    options_request_code:['1'],
    active_notifications_SMS:[false],
    SMS_text:['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
    active_notifications_email:[false],
    email_subject:[''],
    email_text:['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],

  }
  // generalInfoWorkflow: DtoWorkflow;
  constructor() {
  }
}
