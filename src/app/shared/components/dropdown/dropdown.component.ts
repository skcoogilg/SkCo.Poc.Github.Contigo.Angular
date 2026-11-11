import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() iconSize = '';
  @Input() subTitle = '';
  @Input() showIconRight = false;
  @Input() openByDefault = false;

  isCollapsed = signal(this.openByDefault);

  ngOnInit(): void {
    if (this.showIconRight) {
      this.isCollapsed.set(true);
    }
  }

  /**
   * Method to toggle the dropdown
   */
  toggle(): void {
    this.isCollapsed.update((v) => !v);
    if (!this.isCollapsed()) {
      setTimeout(() => window.dispatchEvent(new Event('resize')));
    }
  }
}
