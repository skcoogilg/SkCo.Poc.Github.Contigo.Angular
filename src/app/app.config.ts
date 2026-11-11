import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import {
  encryptInterceptorSkLibrary,
  SkLibraryGlobalConfig as GlobalConfigSkLibrary, // PoC: alias por API de 1.7.9 (npm público)
} from 'skandia-authencrypt';
import { environment, oauthConf } from '@envs/environment';
import { errorInterceptor } from '@interceptors/error.interceptor';
import { headerInterceptor } from '@interceptors/header.interceptor';
import { spinnerInterceptor } from '@interceptors/spinner.interceptor';

//Libreria Skandia para encriptación y desencriptación
GlobalConfigSkLibrary.setConfig({
  apiMatchUrl: environment.baseEnvApimUrl,
  clientId: environment.clientId,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor(),
        spinnerInterceptor,
        headerInterceptor,
        encryptInterceptorSkLibrary,
        errorInterceptor,
      ])
    ),
    provideAuth({
      config: oauthConf,
    }),
  ],
};
