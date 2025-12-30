import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() click = new EventEmitter<Event>();

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  get icon(): IconProp {
    return ['fas', this.iconName!] as IconProp;
  }

  onClick(event: Event): void {
    this.click.emit(event);
    console.log('Кнопка працює — addAuthor() викликано');
  }
}
