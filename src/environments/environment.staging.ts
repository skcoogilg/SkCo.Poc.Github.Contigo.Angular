import { InjectionToken } from '@angular/core';
import { OpenIdConfiguration, LogLevel } from 'angular-auth-oidc-client';

const eventHubsStg = {
  servicebusNamespace: 'skco-event-dev',
  sasKey: '', // PoC: secreto removido (inyectar desde GitHub Secrets si se necesita)
  sasKeyName: 'Access-queue-data-analitycs',
  endpointEvents: 'servicebus.windows.net/queue-data-analitycs/messages',
  apiVersion: '2014-01',
};

export const environment = {
  production: false,
  envName: 'stg',
  bootstrap: [],
  baseEnvApimUrl: 'https://apisstg.skandia.com.co',
  environmentOauth: 'stg',
  clientId: '172eceef-d106-4d55-bb43-0fa8d26bf760',
  allowedUrl:
    'https://uatcontigo.skandia.co/o/headless-admin-user/v1.0/user-accounts',
  useValue: 'https://uatcontigo.skandia.co',
  //EVENT HUBS
  ...eventHubsStg,
};

export const configBootstrap = {
  bootstrap: [],
};

const stgAuthorityUrl =
  'https://skcotest.b2clogin.com/skcotest.onmicrosoft.com/B2C_1A_signin_Service';
const stgIssuerUrl =
  'https://skcotest.b2clogin.com/0db6dbc3-6908-4517-a7f2-81ea685a25e2/v2.0/';
const stgClientId = 'ad7edfc6-a467-40e1-a548-13514d428ada';
const stgsecureApiRoutes = [
  `${environment.baseEnvApimUrl}/SkCo.ContigoClient.Api/v2/`,
  `${environment.baseEnvApimUrl}/SkCo.UsersContigo.Api/v1`,
  `${environment.baseEnvApimUrl}/SkCo.ContractsClient.Contigo.Api/v1/`,
  `${environment.baseEnvApimUrl}/SkCo.FichaReformaContigo.API/v1/`,
];

const stgAuthWellknownEndpoints = {
  issuer: stgIssuerUrl,
  authorizationEndpoint: `${stgAuthorityUrl}/oauth2/v2.0/authorize`,
  tokenEndpoint: `${stgAuthorityUrl}/oauth2/v2.0/token`,
  jwksUri: `${stgAuthorityUrl}/discovery/v2.0/keys`,
  userInfoEndpoint: `${stgAuthorityUrl}/openid/v2.0/userinfo`,
};

const authorityPathStg = 'https://uatcontigo.skandia.co/o/oauth2/authorize';
const redirectUrlStg = window.location.origin.includes('contigo')
  ? window.location.origin + '/inicio'
  : window.location.origin + '/index.html';

const commonConfigStg = {
  redirectUrl: redirectUrlStg,
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
  ignoreNonceAfterRefresh: true,
  issValidationOff: false,
  autoUserInfo: false,
  responseType: 'code',
  logLevel: LogLevel.Error,
};

export const oauthConf: OpenIdConfiguration[] = [
  {
    configId: 'sensedia',
    authority: `${stgAuthorityUrl}/v2.0`,
    authWellknownEndpoints: stgAuthWellknownEndpoints,
    clientId: stgClientId,
    scope: `${stgClientId} profile email offline_access openid`,
    disableIdTokenValidation: true,
    secureRoutes: stgsecureApiRoutes,
    ...commonConfigStg,
  },
  {
    configId: 'liferay',
    authority: authorityPathStg,
    authWellknownEndpoints: {
      issuer: authorityPathStg,
      authorizationEndpoint: authorityPathStg,
      tokenEndpoint: 'https://uatcontigo.skandia.co/o/oauth2/token',
      jwksUri:
        'https://skcotest.b2clogin.com/skcotest.onmicrosoft.com/B2C_1A_signin_Service/discovery/v2.0/keys',
    },
    clientId: 'id-fd182e9d-c355-12d6-c3ee-9256e0d5ef9',
    scope: 'everything GET PATCH',
    disableIdTokenValidation: true,
    secureRoutes: [environment.allowedUrl],
    ...commonConfigStg,
  },
];

export const useHash = false;
export const useSilentRefreshForCodeFlow = false;
export const BASE_URL = new InjectionToken<string>('BASE_URL');
