import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOptions } from '@interfaces/select.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Output() dataSelect = new EventEmitter<string | number>();
  @Input({ required: true }) options: SelectOptions[] = [];
  @Input({ required: true }) selectedValue!: string | number;

  onValueChange() {
    this.dataSelect.emit(this.selectedValue);
  }
}
