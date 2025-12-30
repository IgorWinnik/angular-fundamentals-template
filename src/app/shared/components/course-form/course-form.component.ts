import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  submitted = false;

  courseForm: FormGroup;

  allAuthors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  courseAuthors: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],

      // 🔑 author має бути тут
      author: [
        '',
        [
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z ]+$/),
        ],
      ],

      authors: this.fb.array([]),
    });
  }

  // ===== getters =====
  get title(): AbstractControl | null {
    return this.courseForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.courseForm.get('description');
  }

  get duration(): AbstractControl | null {
    return this.courseForm.get('duration');
  }

  get author(): AbstractControl | null {
    return this.courseForm.get('author');
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  shouldShowError(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // ===== logic =====
  addAuthor(): void {
    if (!this.author || this.author.invalid || !this.author.value) {
      return;
    }

    const newAuthor = {
      id: Date.now(),
      name: this.author.value,
    };

    this.courseAuthors.push(newAuthor);

    this.authors.push(
      this.fb.group({
        name: [newAuthor.name, [Validators.required, Validators.minLength(2)]],
      })
    );

    this.author.reset();
  }

  moveToCourse(author: { id: number; name: string }): void {
    this.courseAuthors.push(author);
    this.allAuthors = this.allAuthors.filter(a => a.id !== author.id);

    this.authors.push(
      this.fb.group({
        name: [author.name, [Validators.required, Validators.minLength(2)]],
      })
    );
  }

  removeFromCourse(author: { id: number; name: string }, index: number): void {
    this.courseAuthors.splice(index, 1);
    this.allAuthors.push(author);
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    console.log('Course submitted', this.courseForm.value);
  }
}
