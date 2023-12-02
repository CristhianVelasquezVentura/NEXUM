import {
    IFormBasicDataValues,
    IFormBrandValues,
    IFormNotifySignerSMSValues,
    IFormNotifySignerEMAILValues,
    IFormStyleSignValues,
    IFormOTPValues,
    IFormOTPNotifySMSValues,
    IFormOTPNotifyEMAILValues,
    IFormReminderSMSValues,
    IFormReminderEMAILValues
} from "@app/core/forms/workflow";

export interface IValuesStep1 {
    formBasic: IFormBasicDataValues;
    formBranding: IFormBrandValues;
}

export interface IFormAnnexesStep1 {
    doctype_name: string;
    required: boolean;
}

/**
 * STEP 2
 */
export interface IValuesStep2 {
    formStyleSign: IFormStyleSignValues;
}

/**
 * STEP 3
 */
export interface IValuesStep3 {
    formSignerNotifySMS: IFormNotifySignerSMSValues;
    formSignerNotifyEMAIL: IFormNotifySignerEMAILValues;
}

/**
 * STEP 4
 */
export interface IValuesStep4 {
    formOTP: IFormOTPValues;
    formOTPNotifySMS: IFormOTPNotifySMSValues;
    formOTPNotifyEMAIL: IFormOTPNotifyEMAILValues;
}

/**
 * STEP 5
 */
export interface IValuesStep5 {
    formReminderSMS: IFormReminderSMSValues;
    formReminderEMAIL: IFormReminderEMAILValues;
}
