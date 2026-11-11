import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  @Output() criteria = new EventEmitter<string>();
  @Input() placeHolder = '';

  @Input() tittle: string = '';

  searchCriteria(value: string) {
    this.criteria.emit(value);
  }
}
