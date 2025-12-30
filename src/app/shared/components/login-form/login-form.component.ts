// login-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], // кастомний валідатор буде через директиву
      password: ['', Validators.required],
    });
  }

  // Геттер для доступу до контролів
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Показ помилок
  shouldShowError(controlName: string): boolean {
    const control = this.f[controlName];
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // Обробка сабміту
  onSubmit(): void {
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    console.log('Login data:', this.loginForm.value);
  }
}
