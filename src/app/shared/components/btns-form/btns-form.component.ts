import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { BtnsProperties } from '@interfaces/btns-form.interface';
import { InvestmentService } from '@services/investment.service';

@Component({
  selector: 'app-btns-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btns-form.component.html',
  styleUrl: './btns-form.component.scss',
})
export class BtnsFormComponent {
  //Dependencias
  private readonly investmentService = inject(InvestmentService);

  //Variables
  private readonly _BtnIndicators = this.investmentService.getBtnIndicators();
  @Input() btnsProperties!: BtnsProperties;
  @Output() getOption = new EventEmitter<string>();
  selectedOption: string = '';
  compar: string | undefined = '';

  constructor() {
    effect(() => {
      this.compar =
        this._BtnIndicators().find((el) =>
          this.btnsProperties.options.includes(el)
        ) || '';
      this.selectedOption = this.compar ? this.compar : '';
    });
  }

  selectOption(data: string) {
    if (this.selectedOption === data) {
      this.selectedOption = '';
      this.getOption.emit('');
    } else {
      this.selectedOption = data;
      this.getOption.emit(data);
    }
  }
}
