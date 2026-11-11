import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BtnsFormComponent } from './btns-form.component';
import { InvestmentService } from '@services/investment.service';
import { BtnsProperties } from '@interfaces/btns-form.interface';

// Mock de InvestmentService
class MockInvestmentService {
  getBtnIndicators() {
    return () => ['opcion1', 'opcion2', 'opcion3'];
  }
}

describe('BtnsFormComponent', () => {
  let component: BtnsFormComponent;
  let fixture: ComponentFixture<BtnsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnsFormComponent],
      providers: [
        { provide: InvestmentService, useClass: MockInvestmentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnsFormComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar `selectedOption` y `compar` cuando hay coincidencia', () => {
    component.btnsProperties = {
      options: ['opcion2', 'otra'],
    } as BtnsProperties;

    fixture.detectChanges();

    expect(component.compar).toBe('opcion2');
    expect(component.selectedOption).toBe('opcion2');
  });

  it('debería inicializar `selectedOption` vacío cuando no hay coincidencia', () => {
    component.btnsProperties = {
      options: ['no-existe'],
    } as BtnsProperties;

    fixture.detectChanges();

    expect(component.compar).toBe('');
    expect(component.selectedOption).toBe('');
  });

  it('debería emitir la opción seleccionada al ejecutar selectOption', () => {
    component.btnsProperties = {
      options: ['opcion1', 'opcion2'],
    } as BtnsProperties;

    fixture.detectChanges();

    spyOn(component.getOption, 'emit');

    component.selectOption('opcion2');

    expect(component.selectedOption).toBe('opcion2');
    expect(component.getOption.emit).toHaveBeenCalledWith('opcion2');
  });
});
