import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-not-data-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './not-data-modal.component.html',
  styleUrl: './not-data-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotDataModalComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() type: 'success' | 'info' | 'error' | 'warning' = 'info';
  @Input() showBackBtn: boolean = false;

  private readonly activeModal = inject(NgbActiveModal);

  closeModal() {
    this.activeModal.dismiss();
  }
}
