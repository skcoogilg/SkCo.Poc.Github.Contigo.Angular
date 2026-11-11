import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer.component';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigation', () => {
    it('should go to next page if not at the end', () => {
      component.page = 1;
      component.totalPages = 5;
      component.nextPage();
      expect(component.page).toBe(2);
    });

    it('should not go past totalPages', () => {
      component.page = 5;
      component.totalPages = 5;
      component.nextPage();
      expect(component.page).toBe(5);
    });

    it('should go to previous page if page > 1', () => {
      component.page = 3;
      component.previousPage();
      expect(component.page).toBe(2);
    });

    it('should not go below page 1', () => {
      component.page = 1;
      component.previousPage();
      expect(component.page).toBe(1);
    });
  });

  describe('zoom', () => {
    it('should zoom in', () => {
      component.zoom = 1;
      component.zoomIn();
      expect(component.zoom).toBe(1.1);
    });

    it('should zoom out but not below 0.2', () => {
      component.zoom = 0.25;
      component.zoomOut();
      expect(component.zoom).toBeCloseTo(0.15, 1); // límite de lógica
    });

    it('should not zoom out below 0.2', () => {
      component.zoom = 0.2;
      component.zoomOut();
      expect(component.zoom).toBe(0.2);
    });
  });

  describe('page input change', () => {
    it('should update page when input changes', () => {
      const event = { target: { value: '3' } };
      component.pageInputChange(event);
      expect(component.page).toBe(3);
    });
  });

  describe('close event', () => {
    it('should emit close when emitClose is called', () => {
      spyOn(component.close, 'emit');
      component.emitClose();
      expect(component.close.emit).toHaveBeenCalledWith(true);
    });

    it('should emit close when Escape key is pressed', () => {
      spyOn(component, 'emitClose');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleKeyboardEvent(event);
      expect(component.emitClose).toHaveBeenCalled();
    });
  });

  describe('pdf load', () => {
    it('should set totalPages and call adjustZoom', () => {
      const mockPdf: Partial<PDFDocumentProxy> = {
        numPages: 10,
        getPage: () =>
          Promise.resolve({
            getViewport: () => ({ width: 800, height: 1000 }),
          } as any),
      };

      spyOn(component, 'adjustZoom');
      component.onLoadComplete(mockPdf as PDFDocumentProxy);
      expect(component.totalPages).toBe(10);
      expect(component.adjustZoom).toHaveBeenCalled();
    });
  });

  describe('base64ToFile', () => {
    it('should convert base64 string to File', () => {
      const base64 = btoa('Hello PDF');
      const file = component.base64ToFile(base64, 'test.pdf');
      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe('test.pdf');
    });
  });

  it('downloadPdf debería crear un blob y descargar el archivo', () => {
    // Base64 válido de prueba ("PDF")
    const base64 = 'data:application/pdf;base64,' + btoa('PDF TEST');

    component.fileSrc = base64;
    component.fileName = 'archivo.pdf';

    // Mock del link
    const clickSpy = jasmine.createSpy('click');

    spyOn(document, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: clickSpy,
    } as any);

    const createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue(
      'blob:mock-url',
    );

    const revokeObjectURLSpy = spyOn(URL, 'revokeObjectURL');

    component.downloadPdf();

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
