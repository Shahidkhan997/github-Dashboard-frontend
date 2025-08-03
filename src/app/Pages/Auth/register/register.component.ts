import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import {
  API_URL,
  Lengths,
  Patterns,
  ValidationMessages,
} from '@Constants/index';
import { PasswordsMatchValidator } from '@Helpers/CustomValidators';
import { AuthLayoutComponent } from '@Layouts/auth-layout/auth-layout.component';
import { ToastserviceService } from '@Services/toastservice.service';
import { AsyncHandlerService } from '@Services/async-handler.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { ApiService } from '@Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgIf,
    AuthLayoutComponent,
  ],
})
export class RegisterComponent {
  validationMessages = ValidationMessages;
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;
  constructor(
    private toastService: ToastserviceService,
    private api: ApiService,
    private asyncHandler: AsyncHandlerService,
    private router: Router
  ) {}

  registerForm = new FormGroup(
    {
      fullName: new FormControl('Khan Afridi', [
        Validators.required,
        Validators.minLength(Lengths.fullNameMinLength),
        Validators.maxLength(Lengths.fullNameMaxLength),
        Validators.pattern(Patterns.alphabetsPattern),
      ]),
      email: new FormControl('khan@gmail.com', [
        Validators.required,
        Validators.pattern(Patterns.emailPattern),
        Validators.maxLength(Lengths.emailMaxLength),
      ]),
      password: new FormControl('Khan@1234', [
        Validators.required,
        Validators.pattern(Patterns.passwordPattern),
        Validators.maxLength(Lengths.passwordMaxLength),
        Validators.minLength(Lengths.passwordMinLength),
      ]),
      confirmPassword: new FormControl('Khan@1234', [Validators.required]),
    },
    // custom validator to match password and confirm password
    { validators: PasswordsMatchValidator }
  );

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.loading = true;
      this.asyncHandler.handleObservable(
        this.api.postData(API_URL.register, this.registerForm.value),
        (response) => {
          this.toastService.successMessage(
            response?.message || 'Registration successful!'
          );
          this.router.navigate(['/auth/signin']);
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
