import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {IFormBrand} from "@app/core/forms/workflow/form-workflow.model";
import {IFormAnnexesStep1} from "@app/core/models/workflow/workflow.model";
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";

@Injectable({
  providedIn: 'root',
})

export class FormWorkflowService {
  private _fb = inject(FormBuilder);
  private _fbNonNull = inject(NonNullableFormBuilder);

  public generalInfoForm = this.initGeneralInfoForm();
  public attachedDocuments: IFormAnnexesStep1[] = [];
  public annexesForm = this.initAnnexesForm();

  public brandingForm = this.initBrandingForm();
  public signStyleForm = this.initSignStyleForm();
  public notifySignersSMSForm = this.initNotifySignersSMSForm();
  public notifySignersEmailForm = this.initNotifySignersEmailForm();
  public OtpFormControl = this.initOtpForm();


  private initGeneralInfoForm() {
    return this._fbNonNull.group({
      name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
      id_language: ['', NgxValidators.required],
      document_expiration: [1, NgxValidators.required],
      id_expiration_frequency: [8, NgxValidators.required],

      sender_name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
      sender_email: ['', [NgxValidators.required, NgxValidators.email]],
      sender_cellphone_code: ['', NgxValidators.required],
      sender_cellphone: ['', [NgxValidators.required, NgxValidators.minLength(9), NgxValidators.maxLength(12)]],

      url_page_redirect: ['', NgxValidators.required],
      url_api_redirect: ['', NgxValidators.required],

      //body_font: ['', NgxValidators.required],
      //body_font_size: ['', NgxValidators.required],
      //body_color_bg: ['#000000', NgxValidators.required],
      //body_color_font: ['#000000', NgxValidators.required],

      //button_font: ['', NgxValidators.required],
      //button_font_size: ['', NgxValidators.required],
      //button_color_bg: ['#000000', NgxValidators.required],
      //button_color_font: ['#000000', NgxValidators.required]
    })
  };

  public initAnnexesForm() {
    return this._fb.group({
      name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
      isRequired: [false]
    })
  }

  public initBrandingForm() {
    return new FormGroup<IFormBrand>({
      brand: new FormControl<string>('', {validators: [NgxValidators.required], nonNullable: true}),
      body_color_font: new FormControl<string>('#000000', {validators: [NgxValidators.required], nonNullable: true}),
      body_font: new FormControl<string>('', {validators: [NgxValidators.required], nonNullable: true}),
      //body_font_size: ['', NgxValidators.required],
      //body_color_bg: ['#000000', NgxValidators.required],
      //button_font: ['', NgxValidators.required],
      //button_font_size: ['', NgxValidators.required],
      //button_color_bg: ['#000000', NgxValidators.required],
      //button_color_font: ['#000000', NgxValidators.required]
    })
  };

  public initSignStyleForm() {
    return this._fbNonNull.group({
      color: ['#000000', NgxValidators.required],
      color_text: ['#000000', NgxValidators.required],
      id_font: ['', NgxValidators.required],
      include_names: [false],
      include_id_number: [false],
      include_role: [false],
      include_initials: [false],
      include_rubric: [false],
      show_signature_line: [false]
    })
  }

  public initNotifySignersSMSForm() {
    return this._fb.group({
      title: [''],
      sender_name: [''],
      sender_cellphone_code: [''],
      sender_cellphone: [''],
      text: ['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
      activate_reminder: [false]
    })
  }

  public initNotifySignersEmailForm() {
    return this._fb.group({
      language: [''],
      subject: [''],
      cc: [''],
      bcc: [''],
      text: ['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
      activate_reminder: [false]

    })
  }

  public initOtpForm() {
    return this._fb.group({
      characters: ['0', NgxValidators.required],
      attempts: ['0', NgxValidators.required],
      ttl: ['0', NgxValidators.required],
      frequency_time: ['Minutos', NgxValidators.required],
      options_request_code: ['1'],
      active_notifications_SMS: [false],
      SMS_text: ['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],
      active_notifications_email: [false],
      email_subject: [''],
      email_text: ['Hola [nombre], espero que esté teniendo un buen día, aquí le entrego el documento habilitado por [tiempo_activo], [url].'],

    })
  }
}
