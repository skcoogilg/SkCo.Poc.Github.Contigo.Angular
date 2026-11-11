import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotDataModalComponent } from './not-data-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

class MockActiveModal {
  dismiss = jasmine.createSpy('dismiss');
}

describe('NotDataModalComponent', () => {
  let component: NotDataModalComponent;
  let fixture: ComponentFixture<NotDataModalComponent>;
  let activeModal: MockActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotDataModalComponent],
      providers: [{ provide: NgbActiveModal, useClass: MockActiveModal }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotDataModalComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal) as unknown as MockActiveModal;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título y descripción', () => {
    component.title = 'Sin datos';
    component.description = 'No se encontraron registros';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('p.sk-h4')).nativeElement;
    const descEl = fixture.debugElement.query(
      By.css('p.text-body-2')
    ).nativeElement;

    expect(titleEl.textContent).toContain('Sin datos');
    expect(descEl.textContent).toContain('No se encontraron registros');
  });

  it('debería usar el tipo "error" en los estilos', () => {
    component.type = 'error';
    fixture.detectChanges();

    const iconWrapper = fixture.debugElement.query(
      By.css('.icon-exclamation-custom')
    ).nativeElement;
    expect(iconWrapper.className).toContain('bg-error-sk');

    const iconSpan = fixture.debugElement.query(
      By.css('.icon-circle-exclamation-line')
    ).nativeElement;
    expect(iconSpan.className).toContain('text-error-sk');
  });

  it('debería llamar a closeModal() al hacer click en el botón de cerrar', () => {
    spyOn(component, 'closeModal').and.callThrough();
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(
      By.css('.close-btn')
    ).nativeElement;
    closeBtn.click();

    expect(component.closeModal).toHaveBeenCalled();
    expect(activeModal.dismiss).toHaveBeenCalled();
  });

  it('debería llamar a closeModal() al hacer click en el botón de "Regresar"', () => {
    component.showBackBtn = true;
    fixture.detectChanges();

    const backBtn = fixture.debugElement.query(
      By.css('.back-btn')
    ).nativeElement;
    backBtn.click();

    expect(activeModal.dismiss).toHaveBeenCalled();
  });
});
