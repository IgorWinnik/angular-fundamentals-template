import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, EmailValidatorDirective.prototype.validate]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.f[controlName];
    return control.invalid && (control.touched || this.submitted);
  }

  onSubmit() {
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    console.log('Login data:', this.loginForm.value);
  }
}
