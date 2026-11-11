import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertInlineComponent } from './alert-inline.component';

describe('AlertInlineComponent', () => {
  let component: AlertInlineComponent;
  let fixture: ComponentFixture<AlertInlineComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertInlineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertInlineComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título y el texto', () => {
    component.title = 'Título de prueba';
    component.text = 'Texto de prueba';
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Título de prueba');
    expect(compiled.textContent).toContain('Texto de prueba');
  });

  it('debería asignar el ícono por defecto según el tipo', () => {
    component.title = 'Alerta';
    component.text = 'Con éxito';
    component.type = 'success';
    fixture.detectChanges();

    expect(component.iconClass).toBe('icon-Circle-check-line');
  });

  it('debería usar un ícono personalizado si se pasa el input `icon`', () => {
    component.title = 'Alerta';
    component.text = 'Con ícono custom';
    component.type = 'error';
    component.icon = 'icon-personalizado';
    fixture.detectChanges();

    expect(component.iconClass).toBe('icon-personalizado');
  });

  it('debería asignar correctamente la clase de fondo según el tipo', () => {
    component.type = 'error';
    expect(component.bgClass).toBe('bg-alert-inline-danger');

    component.type = 'success';
    expect(component.bgClass).toBe('bg-alert-inline-success');

    component.type = 'warning';
    expect(component.bgClass).toBe('bg-alert-inline-warning');

    component.type = 'info';
    expect(component.bgClass).toBe('bg-alert-inline-info');
  });

  it('debería asignar correctamente la clase de texto según el tipo', () => {
    component.type = 'warning';
    expect(component.textClass).toBe('text-dark');

    component.type = 'info';
    expect(component.textClass).toBe('text-dark');

    component.type = 'success';
    expect(component.textClass).toBe('text-light');

    component.type = 'error';
    expect(component.textClass).toBe('text-light');
  });
});
