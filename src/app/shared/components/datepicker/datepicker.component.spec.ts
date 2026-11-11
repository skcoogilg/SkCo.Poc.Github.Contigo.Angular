import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerComponent } from './datepicker.component';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { AgentClientInfoService } from '@services/agent-client-info.service';

// Mock de NgbCalendar
class MockCalendar {
  getToday() {
    return new NgbDate(2023, 9, 3);
  }
  isValid(date: NgbDate) {
    return !!date;
  }
}

// Mock de NgbDateParserFormatter
class MockFormatter {
  parse(value: string): { year: number; month: number; day: number } | null {
    if (value === '2023-09-01') return { year: 2023, month: 9, day: 1 };
    if (value === '2023-09-05') return { year: 2023, month: 9, day: 5 };
    return null;
  }
  format(date: NgbDate | null): string {
    return date ? `${date.year}-${date.month}-${date.day}` : '';
  }
}

// Mock de AgentClientInfoService
class MockAgentClientInfoService {
  getDataClient() {
    return { id: 1, name: 'Cliente Prueba' };
  }
}

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerComponent],
      providers: [
        { provide: NgbCalendar, useClass: MockCalendar },
        { provide: NgbDateParserFormatter, useClass: MockFormatter },
        {
          provide: AgentClientInfoService,
          useClass: MockAgentClientInfoService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería parsear una fecha ISO correctamente', () => {
    const ngbDate = component.parseISOStringToNgbDate('2023-09-01T00:00:00Z');
    expect(ngbDate.year).toBe(2023);
    expect(ngbDate.month).toBe(9);
    expect(ngbDate.day).toBe(1);
  });

  it('debería asignar fromDate cuando se selecciona la primera fecha', () => {
    const date = new NgbDate(2023, 9, 1);
    component.onDateSelection(date, { close: () => {} });
    expect(component.fromDate).toEqual(date);
  });

  it('debería asignar toDate y emitir eventos al seleccionar un rango válido', () => {
    const spyDateToRequest = spyOn(component.dateToRequest, 'emit');
    const spyDoRequest = spyOn(component.doRequest, 'emit');

    const from = new NgbDate(2023, 9, 1);
    const to = new NgbDate(2023, 9, 2);

    component.onDateSelection(from, { close: () => {} });
    component.onDateSelection(to, { close: () => {} });

    expect(component.toDate).toEqual(to);
    expect(spyDateToRequest).toHaveBeenCalledWith({
      iDate: '2023/9/1',
      fDate: '2023/9/2',
    });
    expect(spyDoRequest).toHaveBeenCalledWith(true);
  });

  it('debería resetear toDate si se selecciona una fecha anterior a fromDate', () => {
    const from = new NgbDate(2023, 9, 3);
    const earlier = new NgbDate(2023, 9, 1);

    component.onDateSelection(from, { close: () => {} });
    component.onDateSelection(earlier, { close: () => {} });

    expect(component.fromDate).toEqual(earlier);
    expect(component.toDate).toBeNull();
  });

  it('validateInput debería retornar null y setear alerta si el input está vacío', () => {
    const result = component.validateInput(true, null, '');
    expect(result).toBeNull();
    expect(component.alertMsn).toBe('Las fechas no pueden estar vacías');
    expect(component.fromDate).toBeNull();
    expect(component.toDate).toBeNull();
  });

  it('validateInput debería marcar formato incorrecto cuando no se puede parsear', () => {
    const spyDoRequest = spyOn(component.doRequest, 'emit');
    const result = component.validateInput(true, null, 'texto');
    expect(result).toBeNull();
    expect(component.alertMsn).toBe('formato incorrecto');
    expect(spyDoRequest).toHaveBeenCalledWith(false);
  });

  it('onKeyDown debería emitir false si no hay fechas seleccionadas', () => {
    spyOn(component.doRequest, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);
    expect(component.doRequest.emit).toHaveBeenCalledWith(false);
    expect(component.alertMsn).toBe('Las fechas no pueden estar vacías');
  });

  it('isRange debería devolver true si la fecha está dentro del rango', () => {
    component.fromDate = new NgbDate(2023, 9, 1);
    component.toDate = new NgbDate(2023, 9, 5);

    const inside = new NgbDate(2023, 9, 3);

    expect(component.isInside(inside)).toBeTrue();
    expect(component.isRange(component.fromDate!)).toBeTrue();
    expect(component.isRange(component.toDate!)).toBeTrue();
  });

  it('Debería validar las fechas al presionar enter', () => {
    component.fromDate = new NgbDate(2023, 9, 1);
    component.toDate = new NgbDate(2023, 9, 2);
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);
    expect(component.alertMsn).toBe('');
  });
});
