import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private renderer: Renderer2;
  private toastElement?: HTMLElement;
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 5000
  ) {
    this.hide();

    const div = this.renderer.createElement('div');

    const bgClass = {
      success: 'toast-contigo bg-toast-success',
      error: 'toast-contigo bg-toast-danger text-light',
      warning: 'toast-contigo bg-toast-warning',
      info: 'toast-contigo bg-toast-info',
    }[type];

    const iconClass = {
      success: 'icon-Circle-check-line',
      error: 'icon-Circle-xmark-line',
      warning: 'icon-Circle-question-line',
      info: 'icon-circle-exclamation-line',
    }[type];

    this.renderer.setProperty(
      div,
      'innerHTML',
      `
      <div class="toast show position-fixed top-0 end-0 m-3 ${bgClass}" role="alert" style="z-index:1200; min-width: 250px;">
        <div class="toast-body d-flex align-items-center gap-2">
          <span class="${iconClass} fs-5"></span>
          <span>${message}</span>
        </div>
      </div>
    `
    );

    this.toastElement = div.firstElementChild as HTMLElement;
    this.renderer.appendChild(document.body, this.toastElement);

    this.timeout = setTimeout(() => this.hide(), duration);
  }

  hide(): void {
    if (this.toastElement) {
      this.renderer.removeChild(document.body, this.toastElement);
      this.toastElement = undefined;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}
