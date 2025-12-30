import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.f[controlName];
    return control.touched && control.invalid;
  }

  onSubmit(): void {
    Object.values(this.registrationForm.controls)
      .forEach(control => control.markAsTouched());

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}
