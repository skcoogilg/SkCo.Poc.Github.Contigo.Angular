import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

const MODULES = [CommonModule];

@Component({
  selector: 'app-alert-inline',
  standalone: true,
  imports: [MODULES],
  templateUrl: './alert-inline.component.html',
  styleUrl: './alert-inline.component.scss',
})
export class AlertInlineComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) type: 'success' | 'error' | 'warning' | 'info' =
    'info';
  @Input() icon!: string;

  get iconClass(): string {
    return (
      this.icon ??
      {
        success: 'icon-Circle-check-line',
        error: 'icon-Circle-xmark-line',
        warning: 'icon-Circle-question-line',
        info: 'icon-circle-exclamation-line',
      }[this.type]
    );
  }

  get bgClass(): string {
    return {
      success: 'bg-alert-inline-success',
      error: 'bg-alert-inline-danger',
      warning: 'bg-alert-inline-warning',
      info: 'bg-alert-inline-info',
    }[this.type];
  }

  get textClass(): string {
    return this.type === 'warning' || this.type === 'info'
      ? 'text-dark'
      : 'text-light';
  }
}
