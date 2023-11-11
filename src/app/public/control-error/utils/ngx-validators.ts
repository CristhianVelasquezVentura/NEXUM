import {ValidatorFn, Validators} from '@angular/forms';

const VALIDATOR_MESSAGE_DEFAULT = {
  required: 'Este campo es requerido',
  email: 'Ingrese un Email valido',
  //max: 'Excede el valor máximo, max:${max} valor actual:${current}'
  max: 'Excede el valor máximo, max:${max} valor actual:${current}',
  minLength: 'Este campo no supera la longitud mínima, mínimo:${minLength} valor actual:${current}',
  maxLength: 'Este campo supera la longitud máxima, máximo:${maxLength} valor actual:${current}',
};

export class NgxValidators {
  public static required = this.requiredFn()
  public static email = this.emailFn()

  private static requiredFn(): ValidatorFn {
    return (control) => {
      const error = Validators.required(control);
      return error ? {required: this._getMessage('required')} : null;
    };
  }

  public static emailFn(): ValidatorFn {
    return (control) => {
      const error = Validators.email(control);
      return error ? {email: this._getMessage('email')} : null;
    };
  }

  public static max(max: number): ValidatorFn {
    return (control) => {
      const maxfunction = Validators.max(max);
      const error = maxfunction(control);

      return error ? {max: this._getMessage('max', [{max: 12, current: 18}])} : null;
    };
  }

  public static minLength(minLength: number): ValidatorFn {
    return (control) => {
      const minLengthFunction = Validators.minLength(minLength);
      const error = minLengthFunction(control);

      return error ? {minLength: this._getMessage('minLength', [{minLength: minLength, current: control.value?.length || 0}])} : null;
    };
  }

  public static maxLength(maxLength: number): ValidatorFn {
    return (control) => {
      const maxLengthFunction = Validators.maxLength(maxLength);
      const error = maxLengthFunction(control);

      return error ? {
        maxLength: this._getMessage(
          'maxLength', [{maxLength: maxLength, current: control.value?.length || 0}])
      } : null;
    };
  }

  private static _getMessage(
    control: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
    paramsMessage?: { [key: string]: unknown }[]
  ) {

    let messageControl = VALIDATOR_MESSAGE_DEFAULT[control];
    const existParams = paramsMessage && paramsMessage.length > 0;

    if (existParams) {
      paramsMessage.forEach((params) => {
        Object.keys(params)
          .filter((key) => params[key])
          .forEach((key) => {
            messageControl = messageControl.replace(`\${${key}}`, params[key]!.toString());
          });
      });

      return messageControl;
    }

    return messageControl;
  }
}
