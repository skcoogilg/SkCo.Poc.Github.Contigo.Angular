import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    service = TestBed.inject(LoadingService);
    rendererFactory = TestBed.inject(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  afterEach(() => {
    // Limpieza defensiva por si algún test falla
    const existingLoader = document.body.querySelector('.all-screen');
    if (existingLoader) {
      document.body.removeChild(existingLoader);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append loader to DOM when show() is called', () => {
    service.show();

    const loader = document.body.querySelector('.all-screen');
    expect(loader).toBeTruthy();
  });

  it('should not append multiple loaders if show() is called twice', () => {
    service.show();
    service.show();

    const loaders = document.body.querySelectorAll('.all-screen');
    expect(loaders.length).toBe(1);
  });

  it('should remove loader from DOM when hide() is called', () => {
    service.show();
    service.hide();

    const loader = document.body.querySelector('.all-screen');
    expect(loader).toBeNull();
  });

  it('should not throw error if hide() is called without show()', () => {
    expect(() => service.hide()).not.toThrow();
  });
});
