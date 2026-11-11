import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CheckboxOptions,
  CheckboxProperties,
} from '@interfaces/checkbox.interface';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent implements OnChanges {
  private readonly properties: CheckboxProperties = {
    tittle: '',
    options: [],
  };
  @Input({ required: true }) checkboxProperties: CheckboxProperties =
    this.properties;
  @Input({ required: true }) checkboxForm!: FormGroup;
  @Input({ required: true }) filterCriteria: string = '';
  @Input() showCanCheckAll: boolean = false;
  @Input() allChecked: boolean = false;
  @Output() allCheckedChange = new EventEmitter<boolean>();
  options: CheckboxOptions[] = [];

  constructor() {
    this.options = this.checkboxProperties.options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkboxProperties.options.length !== 0) {
      this.options = this.checkboxProperties.options;
    }
    if (changes['filterCriteria']) {
      this.options = this.checkboxProperties.options;
      this.options = this.options.filter((option: any) =>
        option.name.toLowerCase().includes(this.filterCriteria)
      );
    }
  }

  allCheckedChangeEvent($event: any) {
    const checked = ($event.target as HTMLInputElement).checked;
    for (const key in this.checkboxForm.controls) {
      this.checkboxForm.controls[key].setValue(checked);
    }
    this.allChecked = checked;
    this.allCheckedChange.emit(checked);
  }
}
