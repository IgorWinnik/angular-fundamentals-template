import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  submitted = false;

  courseForm: FormGroup;
  newAuthorGroup: FormGroup;

  allAuthors: { name: string }[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
  ];

  courseAuthors: { name: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
    });

    this.newAuthorGroup = this.fb.group({
      author: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{2,}$/)],
      ],
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

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get author(): AbstractControl | null {
    return this.newAuthorGroup.get('author');
  }

  // ===== logic =====

  addAuthor(): void {
    if (!this.author) return;

    const authorName = this.author.value;

    if (this.newAuthorGroup.invalid || !authorName) return;

    const newAuthor = { name: authorName };

    this.allAuthors.push(newAuthor);
    this.courseAuthors.push(newAuthor);

    this.authors.push(
      this.fb.group({
        author: [
          authorName,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{2,}$/)],
        ],
      })
    );

    this.author.reset();
  }

  moveToCourse(author: { name: string }): void {
    this.courseAuthors.push(author);
    this.allAuthors = this.allAuthors.filter(a => a !== author);

    this.authors.push(
      this.fb.group({
        author: [
          author.name,
          [Validators.required, Validators.minLength(2)],
        ],
      })
    );
  }

  removeFromCourse(author: { name: string }, index: number): void {
    this.courseAuthors.splice(index, 1);
    this.allAuthors.push(author);
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.courseForm.invalid) {
      return;
    }

    console.log('Course submitted:', this.courseForm.value);
  }
}
