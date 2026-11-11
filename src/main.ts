/// <reference types="@angular/localize" />

import { createCustomElement } from '@angular/elements';
import '@angular/localize/init';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  const popupElement = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('poc-github-contigo', popupElement);

  // ðŸ§ª Solo bootstrap si estÃ¡s en local (Ãºtil para desarrollo)
  const isLocal = window.location.hostname === 'localhost';

  if (isLocal) {
    const el = document.createElement('poc-github-contigo');
    document.body.appendChild(el);
  }
})();


