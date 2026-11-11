import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-not-data',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './not-data.component.html',
  styleUrl: './not-data.component.scss',
})
export class NotDataComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() type: 'success' | 'info' | 'error' | 'warning' = 'info';
  @Input() actions!: boolean;
  @Input() showComingSoon!: boolean;
  @Input() customCssDescription!: any;
  @Output() actionsEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.description = this.description.replaceAll('\n', '<br/>');
  }
}
