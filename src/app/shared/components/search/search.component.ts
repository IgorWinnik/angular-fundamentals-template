import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() placeholder = '';
  @Output() search = new EventEmitter<string>();

  searchTerm = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
