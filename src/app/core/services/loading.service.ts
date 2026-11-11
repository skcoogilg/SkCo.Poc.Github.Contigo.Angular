import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private renderer: Renderer2;
  private loaderElement?: HTMLElement;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(): void {
    if (this.loaderElement) return; // Evitar múltiples cargas

    const div = this.renderer.createElement('div');
    this.renderer.setProperty(
      div,
      'innerHTML',
      `
      <div class="all-screen">
        <div class="sk-container-loader">
          <div class="sk-inner-loader one"></div>
          <div class="sk-inner-loader two"></div>
          <div class="sk-inner-loader three"></div>
          <div class="sk-point-loader-2">
            <div class="sk-point-logo"></div>
            <div class="sk-diagonal-square-logo">
              <div class="sk-triangle-logo">
                <div class="sk-text-logo"><span>sk</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    );

    this.loaderElement = div.firstElementChild as HTMLElement;
    this.renderer.appendChild(document.body, this.loaderElement);
  }

  hide(): void {
    if (this.loaderElement) {
      this.renderer.removeChild(document.body, this.loaderElement);
      this.loaderElement = undefined;
    }
  }
}
