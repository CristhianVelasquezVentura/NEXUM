import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {
    IFormBrand,
    IFormNotifySignerEMAIL,
    IFormNotifySignerSMS,
    IFormOTP, IFormOTPNotifyEMAIL, IFormOTPNotifySMS, IFormReminderEMAIL, IFormReminderSMS
} from "@app/core/forms/workflow/form-workflow.model";
import {IFormAnnexesStep1} from "@app/core/models/workflow/workflow.model";
import {NgxValidators} from "@app/public/control-error/utils/ngx-validators";
import {IRoleSigner} from "@app/modules/workflow/models/steps";

@Injectable({
    providedIn: 'root',
})

export class FormWorkflowService {
    private _fb = inject(FormBuilder);
    private _fbNonNull = inject(NonNullableFormBuilder);

    public generalInfoForm = this.initGeneralInfoForm();
    public annexesForm = this.initAnnexesForm();
    public roleForm = this.initRoleForm();
    public attachedDocuments: IFormAnnexesStep1[] = [];
    public roleSigners: IRoleSigner[] = [];

    public brandingForm = this.initBrandingForm();

    public signStyleForm = this.initSignStyleForm();

    public notifySignersSMSForm: FormGroup<IFormNotifySignerSMS>;
    public notifySignersEmailForm: FormGroup<IFormNotifySignerEMAIL>;

    public otpForm = this.initOtpForm();
    public otpNotifySMSForm = this.initOtpNotifySMSForm();
    public otpNotifyEMAILForm = this.initOtpNotifyEMAILForm();

    public reminderSMSForm = this.initReminderSMSForm();
    public reminderEMAILForm = this.initReminderEMAILForm();

    constructor() {
        this.notifySignersSMSForm = this.initNotifySignersSMSForm();
        this.notifySignersEmailForm = this.initNotifySignersEmailForm();

        this.notifySignersSMSForm.disable()
        this.notifySignersEmailForm.disable()
    }


    private initGeneralInfoForm() {
        return this._fbNonNull.group({
            name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
            id_language: new FormControl(4, {validators: [NgxValidators.required]}),
            document_expiration: [1, NgxValidators.required],
            id_expiration_frequency: new FormControl(8, {validators: [NgxValidators.required]}),

            sender_name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
            sender_email: ['', [NgxValidators.required, NgxValidators.email]],
            sender_cellphone_code: ['', NgxValidators.required],
            sender_cellphone: ['', [NgxValidators.required, NgxValidators.minLength(9), NgxValidators.maxLength(12)]],

            url_page_redirect: [''],
            url_api_redirect: [''],

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

    private initAnnexesForm() {
        return this._fb.group({
            doctype_name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
            required: [false]
        })
    }

    private initRoleForm() {
        return this._fb.group({
            name: ['', [NgxValidators.required, NgxValidators.minLength(4), NgxValidators.maxLength(50)]],
        })
    }

    private initBrandingForm() {
        return new FormGroup<IFormBrand>({
            logo_path: new FormControl<string>('', {validators: [NgxValidators.required], nonNullable: true}),
            body_color_font: new FormControl<string>('#000000', {validators: [NgxValidators.required], nonNullable: true}),
            id_body_font: new FormControl<number>(1, {validators: [NgxValidators.required], nonNullable: true}),
            //body_font_size: ['', NgxValidators.required],
            //body_color_bg: ['#000000', NgxValidators.required],
            //button_font: ['', NgxValidators.required],
            //button_font_size: ['', NgxValidators.required],
            //button_color_bg: ['#000000', NgxValidators.required],
            //button_color_font: ['#000000', NgxValidators.required]
        })
    };

    //STEP 2
    private initSignStyleForm() {
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

    //STEP 3
    private initNotifySignersSMSForm() {
        return new FormGroup<IFormNotifySignerSMS>({
            title: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            sender_name: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            sender_cellphone_code: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            sender_cellphone: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [Validators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
            activate_reminder: new FormControl<boolean>(false, {nonNullable: true}),
        })
    }

    private initNotifySignersEmailForm() {
        return new FormGroup<IFormNotifySignerEMAIL>({
            language: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            subject: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            cc: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            bcc: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [Validators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
            activate_reminder: new FormControl<boolean>(false, {nonNullable: true}),
        })
    }

    // STEP 4
    private initOtpForm() {
        return new FormGroup<IFormOTP>({
            characters: new FormControl<number>(0, {validators: NgxValidators.required, nonNullable: true}),
            attempts: new FormControl<number>(0, {validators: NgxValidators.required, nonNullable: true}),
            ttl: new FormControl<number>(0, {validators: NgxValidators.required, nonNullable: true}),
            id_frequency_time: new FormControl<number>(8, {validators: NgxValidators.required, nonNullable: true}),
            id_issues_code: new FormControl<number>(13, {validators: NgxValidators.required, nonNullable: true}),
        })
    }

    private initOtpNotifySMSForm() {
        return new FormGroup<IFormOTPNotifySMS>({
            active_sms: new FormControl<boolean>(false, {validators: NgxValidators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [NgxValidators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
        })
    }

    private initOtpNotifyEMAILForm() {
        return new FormGroup<IFormOTPNotifyEMAIL>({
            active_email: new FormControl<boolean>(false, {validators: NgxValidators.required, nonNullable: true}),
            subject: new FormControl<string>('', {validators: NgxValidators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [NgxValidators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
        })
    }

    // STEP 5
    private initReminderSMSForm() {
        return new FormGroup<IFormReminderSMS>({
            active: new FormControl<boolean>(false, {validators: NgxValidators.required, nonNullable: true}),
            frequency_reminder: new FormControl<number>(1, {validators: NgxValidators.required, nonNullable: true}),
            id_frequency: new FormControl<number>(8, {validators: NgxValidators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [NgxValidators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
        })
    }

    private initReminderEMAILForm() {
        return new FormGroup<IFormReminderEMAIL>({
            active: new FormControl<boolean>(false, {validators: NgxValidators.required, nonNullable: true}),
            frequency_reminder: new FormControl<number>(1, {validators: NgxValidators.required, nonNullable: true}),
            id_frequency: new FormControl<number>(8, {validators: NgxValidators.required, nonNullable: true}),
            subject: new FormControl<string>('', {validators: NgxValidators.required, nonNullable: true}),
            cc: new FormControl<string>('', {validators: NgxValidators.required, nonNullable: true}),
            bcc: new FormControl<string>('', {validators: NgxValidators.required, nonNullable: true}),
            text: new FormControl<string>('', {
                validators: [NgxValidators.required, NgxValidators.maxLength(100)],
                nonNullable: true
            }),
        })
    }
}
