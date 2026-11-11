import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxProperties } from '@interfaces/checkbox.interface';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let form: FormGroup;

  const mockProperties: CheckboxProperties = {
    tittle: 'Opciones de prueba',
    options: [
      { name: 'Opción 1', value: '1' },
      { name: 'Opción 2', value: '2' },
      { name: 'Otra', value: '3' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;

    // Crear un formulario reactivo con controles para las opciones
    const fb = TestBed.inject(FormBuilder);
    form = fb.group({
      option1: [false],
      option2: [false],
      option3: [false],
    });

    component.checkboxForm = form;
    component.checkboxProperties = mockProperties;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las opciones desde checkboxProperties', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      tick(500);
      expect(component.options.length).toBe(3);
      expect(component.options[0].name).toBe('Opción 1');
    });
  });

  it('debería filtrar opciones según filterCriteria', () => {
    component.filterCriteria = 'otra';
    component.ngOnChanges({
      filterCriteria: {
        currentValue: 'otra',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.options.length).toBe(1);
    expect(component.options[0].name).toBe('Otra');
  });

  it('debería marcar todos los checkboxes y emitir true cuando se selecciona "todos"', () => {
    spyOn(component.allCheckedChange, 'emit');

    const event = { target: { checked: true } } as any;
    component.allCheckedChangeEvent(event);

    expect(component.allChecked).toBeTrue();
    expect(component.checkboxForm.get('option1')?.value).toBeTrue();
    expect(component.checkboxForm.get('option2')?.value).toBeTrue();
    expect(component.checkboxForm.get('option3')?.value).toBeTrue();
    expect(component.allCheckedChange.emit).toHaveBeenCalledWith(true);
  });

  it('debería desmarcar todos los checkboxes y emitir false cuando se quita "todos"', () => {
    spyOn(component.allCheckedChange, 'emit');

    const event = { target: { checked: false } } as any;
    component.allCheckedChangeEvent(event);

    expect(component.allChecked).toBeFalse();
    expect(component.checkboxForm.get('option1')?.value).toBeFalse();
    expect(component.checkboxForm.get('option2')?.value).toBeFalse();
    expect(component.checkboxForm.get('option3')?.value).toBeFalse();
    expect(component.allCheckedChange.emit).toHaveBeenCalledWith(false);
  });
});
