import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() title: string = 'Untitled Course';
  @Input() description: string = 'No description';
  @Input() creationDate: Date | string = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();
  @Output() clickOnEdit = new EventEmitter<void>();
  @Output() clickOnDelete = new EventEmitter<void>();

  ngOnInit(): void {
    // Ensure correct data types
    if (typeof this.creationDate === 'string') {
      this.creationDate = new Date(this.creationDate);
    }

    if (!this.duration) {
      this.duration = 0;
    }

    if (!this.authors) {
      this.authors = [];
    }
  }

  onShowCourse(): void {
    console.log('Show course clicked!');
    this.clickOnShow.emit();
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  formatDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return isNaN(parsedDate.getTime()) ? 'Unknown' : parsedDate.toLocaleDateString();
  }

  onEditCourse(): void {
    this.clickOnEdit.emit();
  }

  onDeleteCourse(): void {
    this.clickOnDelete.emit();
  }
}
