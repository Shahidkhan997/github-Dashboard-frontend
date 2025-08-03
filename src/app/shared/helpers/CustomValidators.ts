import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordsMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    // If no mismatch, clear the error on confirmPassword
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false,
      });
    }
    return null;
  }
}
