import { RendererFactory2 } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });

    service = TestBed.inject(ToastService);
    rendererFactory = TestBed.inject(RendererFactory2);
  });

  afterEach(() => {
    // Limpieza defensiva del DOM
    document.body.innerHTML = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ============================
  // show() basic behavior
  // ============================

  it('should append toast to DOM with default type (info)', () => {
    service.show('Test message');

    const toast = document.body.querySelector('.toast');
    expect(toast).toBeTruthy();
    expect(toast?.innerHTML).toContain('Test message');
    expect(toast?.className).toContain('bg-toast-info');
  });

  it('should apply success classes correctly', () => {
    service.show('Success message', 'success');

    const toast = document.body.querySelector('.toast');
    expect(toast?.className).toContain('bg-toast-success');
    expect(toast?.innerHTML).toContain('icon-Circle-check-line');
  });

  it('should apply error classes correctly', () => {
    service.show('Error message', 'error');

    const toast = document.body.querySelector('.toast');
    expect(toast?.className).toContain('bg-toast-danger');
    expect(toast?.innerHTML).toContain('icon-Circle-xmark-line');
  });

  it('should apply warning classes correctly', () => {
    service.show('Warning message', 'warning');

    const toast = document.body.querySelector('.toast');
    expect(toast?.className).toContain('bg-toast-warning');
    expect(toast?.innerHTML).toContain('icon-Circle-question-line');
  });

  // ============================
  // hide behavior
  // ============================

  it('should remove toast from DOM when hide is called', () => {
    service.show('Test');
    service.hide();

    const toast = document.body.querySelector('.toast');
    expect(toast).toBeNull();
  });

  it('should clear previous toast when show is called again', () => {
    service.show('First');
    service.show('Second');

    const toasts = document.body.querySelectorAll('.toast');
    expect(toasts.length).toBe(1);
    expect(toasts[0].innerHTML).toContain('Second');
  });

  // ============================
  // timeout behavior
  // ============================

  it('should auto-hide after duration', fakeAsync(() => {
    service.show('Auto hide', 'info', 1000);

    let toast = document.body.querySelector('.toast');
    expect(toast).toBeTruthy();

    tick(1000);

    toast = document.body.querySelector('.toast');
    expect(toast).toBeNull();
  }));

  it('should clear timeout when hide is called manually', fakeAsync(() => {
    service.show('Manual hide', 'info', 5000);

    service.hide();

    tick(5000);

    const toast = document.body.querySelector('.toast');
    expect(toast).toBeNull();
  }));
});
