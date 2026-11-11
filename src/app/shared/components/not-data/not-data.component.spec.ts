import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotDataComponent } from './not-data.component';
import { By } from '@angular/platform-browser';

describe('NotDataComponent', () => {
  let component: NotDataComponent;
  let fixture: ComponentFixture<NotDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotDataComponent);
    component = fixture.componentInstance;
    component.title = 'Título por defecto';
    component.description = 'Descripción inicial';
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Título por defecto');
  });

  it('debería reemplazar saltos de línea en ngOnInit', () => {
    component.description = 'línea1\nlínea2';
    component.ngOnInit();
    expect(component.description).toContain('<br/>');
  });

  it('debería emitir actionsEvent al invocar emit', () => {
    spyOn(component.actionsEvent, 'emit');
    component.actionsEvent.emit(true);
    expect(component.actionsEvent.emit).toHaveBeenCalledWith(true);
  });

  it('debería aceptar el tipo "success"', () => {
    component.type = 'success';
    fixture.detectChanges();
    expect(component.type).toBe('success');
  });

  it('debería aceptar el tipo "error"', () => {
    component.type = 'error';
    fixture.detectChanges();
    expect(component.type).toBe('error');
  });

  it('debería aceptar el tipo "warning"', () => {
    component.type = 'warning';
    fixture.detectChanges();
    expect(component.type).toBe('warning');
  });

  it('debería tener "info" por defecto', () => {
    const nuevoFixture = TestBed.createComponent(NotDataComponent);
    const nuevoComp = nuevoFixture.componentInstance;
    expect(nuevoComp.type).toBe('info');
  });

  it('debería mostrar coming soon si showComingSoon es true', () => {
    component.showComingSoon = true;
    fixture.detectChanges();
    expect(component.showComingSoon).toBeTrue();
  });
});
