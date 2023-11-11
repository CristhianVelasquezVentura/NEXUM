import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
const ERRORS_DEFAULT: ValidationErrors = {
    required: 'Este campo es requerido',
    email: 'Ingrese un email válido',
    minLength: 'Este campo  tener un tamaño mínimo de $value',
    maxLength: 'Este campo  tener un tamaño máximo de $value',
};
export const getFormControlError = (formControl: AbstractControl): string => {
    if (!formControl.errors) return '';

    const firstErrorKey = Object.keys(formControl.errors!)[0];

    if (formControl.errors[firstErrorKey] === true) {
        return ERRORS_DEFAULT[firstErrorKey];
    }

    return formControl.errors![firstErrorKey] || '';
};

export const getFormControlValueAsType = <T>(formGroup: FormGroup, controlName: string): T | null => {
    const control = formGroup.get(controlName);
    if (control) {
        return control.value as T;
    }
    return null;
};
