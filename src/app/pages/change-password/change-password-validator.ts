import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ChangePasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('repeatPassword');

  return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
};
