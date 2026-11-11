import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AgentClientInfoService } from '@services/agent-client-info.service';

const MODULES = [
  CommonModule,
  NgbDatepickerModule,
  FormsModule,
  NgbTooltipModule,
];

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [MODULES],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent {
  //Dependencias
  private readonly calendar = inject(NgbCalendar);
  public formatter = inject(NgbDateParserFormatter);
  private readonly agentClientSvc = inject(AgentClientInfoService);
  //Variables
  private readonly _today = this.calendar.getToday();
  @Output() doRequest = new EventEmitter<boolean>(false);
  @Output() dateToRequest = new EventEmitter<{
    iDate: string;
    fDate: string;
  }>();
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null; //this.calendar.getToday();
  toDate: NgbDate | null = null;
  isDateCorrect: boolean = true;
  maxDate: NgbDate = this.calendar.getToday(); // Establece la fecha máxima como el día de hoy
  alertMsn: string = '';
  client = this.agentClientSvc.getDataClient();
  @Input() placeholder: string = '';

  @Input() set clearDates(
    value: { fromDate: string; toDate: string; clear: boolean } | null
  ) {
    if (value?.clear) {
      this.fromDate = null;
      this.toDate = null;
      return;
    }
    if (value && value.fromDate && value.toDate) {
      this.fromDate = NgbDate.from(
        this.parseISOStringToNgbDate(value.fromDate)
      );
      this.toDate = NgbDate.from(this.parseISOStringToNgbDate(value.toDate));
    }
  }

  parseISOStringToNgbDate(dateString: string): NgbDate {
    const date = new Date(dateString);
    return new NgbDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    );
  }

  onDateSelection(date: NgbDate, datepicker: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      datepicker.close();
      this.isDateCorrect = true;
      this.dateToRequest.emit({
        iDate: `${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`,
        fDate: `${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`,
      });
      this.doRequest.emit(true);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(
    isFromDate: boolean,
    currentValue: NgbDate | null,
    input: string
  ): NgbDate | null {
    const parsed = this.formatter.parse(input);

    if (parsed && this.calendar.isValid(NgbDate.from(parsed))) {
      const validDate = NgbDate.from(parsed);
      if (isFromDate) {
        if (validDate?.after(this._today)) {
          this.fromDate = this.toDate;
          return this.toDate;
        } else {
          if (validDate?.after(this.toDate)) {
            this.fromDate = this.toDate;
            return this.toDate;
          } else {
            this.isDateCorrect = true;
            this.fromDate = validDate;
            return validDate;
          }
        }
      } else {
        if (validDate?.after(this._today)) {
          this.toDate = this._today;
          return this._today;
        } else {
          if (validDate?.before(this.fromDate)) {
            this.toDate = null;
            return null;
          } else {
            this.isDateCorrect = true;
            this.toDate = validDate;
            return validDate;
          }
        }
      }
    } else {
      this.isDateCorrect = false;
      if (input === '') {
        this.alertMsn = 'Las fechas no pueden estar vacías';
        this.fromDate = null;
        this.toDate = null;
        return null;
      } else {
        this.doRequest.emit(false);
        if (!parsed) {
          this.alertMsn = 'formato incorrecto';
        } else {
          this.alertMsn = 'fecha no existe';
        }
        return currentValue;
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.fromDate && this.toDate) {
        this.isDateCorrect = false;
        if (this.toDate.equals(this.fromDate)) {
          this.isDateCorrect = false;
          this.alertMsn = 'Las fechas no pueden ser iguales';
          this.doRequest.emit(false);
        } else {
          if (
            this.alertMsn === 'formato incorrecto' ||
            this.alertMsn === 'fecha no existe'
          ) {
            this.doRequest.emit(false);
            this.isDateCorrect = false;
          } else {
            this.isDateCorrect = true;
            this.dateToRequest.emit({
              iDate: `${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`,
              fDate: `${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`,
            });
            this.doRequest.emit(true);
          }
        }
      } else {
        this.doRequest.emit(false);
        this.isDateCorrect = false;
        this.alertMsn = 'Las fechas no pueden estar vacías';
      }
    }
  }
}
