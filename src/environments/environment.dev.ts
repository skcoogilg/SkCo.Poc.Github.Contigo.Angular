import { InjectionToken } from '@angular/core';
import { OpenIdConfiguration, LogLevel } from 'angular-auth-oidc-client';

const eventHubsDev = {
  servicebusNamespace: 'skco-event-dev',
  sasKey: '', // PoC: secreto removido (inyectar desde GitHub Secrets si se necesita)
  sasKeyName: 'Access-queue-data-analitycs',
  endpointEvents: 'servicebus.windows.net/queue-data-analitycs/messages',
  apiVersion: '2014-01',
};

export const environment = {
  production: false,
  bootstrap: [],
  baseEnvApimUrl: 'https://apisstg.skandia.com.co',
  environmentOauth: 'dev',
  clientId: '172eceef-d106-4d55-bb43-0fa8d26bf760',
  allowedUrl:
    'https://devcontigo.skandia.co/o/headless-admin-user/v1.0/user-accounts',
  useValue: 'https://devcontigo.skandia.co',
  //EVENT HUBS
  ...eventHubsDev,
};

export const configBootstrap = {
  bootstrap: [],
};

const devAuthorityUrl =
  'https://skcotest.b2clogin.com/skcotest.onmicrosoft.com/B2C_1A_signin_Service';
const devIssuerUrl =
  'https://skcotest.b2clogin.com/0db6dbc3-6908-4517-a7f2-81ea685a25e2/v2.0/';
const devClientId = 'ad7edfc6-a467-40e1-a548-13514d428ada';
const devsecureApiRoutes = [
  `${environment.baseEnvApimUrl}/SkCo.ContractsClient.Contigo.Api/v1/`,
  `${environment.baseEnvApimUrl}/SkCo.ContigoClient.Api/v2/`,
  `${environment.baseEnvApimUrl}/SkCo.UsersContigo.Api/v1`,
  `${environment.baseEnvApimUrl}/SkCo.FichaReformaContigo.API/v1/`,
];

const devAuthWellknownEndpoints = {
  issuer: devIssuerUrl,
  authorizationEndpoint: `${devAuthorityUrl}/oauth2/v2.0/authorize`,
  tokenEndpoint: `${devAuthorityUrl}/oauth2/v2.0/token`,
  jwksUri: `${devAuthorityUrl}/discovery/v2.0/keys`,
  userInfoEndpoint: `${devAuthorityUrl}/openid/v2.0/userinfo`,
};

const authorityPathDev = 'https://devcontigo.skandia.co/o/oauth2/authorize';
const redirectUrlDev = window.location.origin.includes('contigo')
  ? window.location.origin + '/inicio'
  : window.location.origin + '/index.html';

const commonConfigDev = {
  redirectUrl: redirectUrlDev,
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
    authority: `${devAuthorityUrl}/v2.0`,
    authWellknownEndpoints: devAuthWellknownEndpoints,
    clientId: devClientId,
    scope: `${devClientId} profile email offline_access openid`,
    disableIdTokenValidation: true,
    secureRoutes: devsecureApiRoutes,
    ...commonConfigDev,
  },
  {
    configId: 'liferay',
    authority: authorityPathDev,
    authWellknownEndpoints: {
      issuer: authorityPathDev,
      authorizationEndpoint: authorityPathDev,
      tokenEndpoint: 'https://devcontigo.skandia.co/o/oauth2/token',
      jwksUri:
        'https://skcotest.b2clogin.com/skcotest.onmicrosoft.com/B2C_1A_signin_Service/discovery/v2.0/keys',
    },
    clientId: 'id-eff0f7db-5598-9d45-b046-77ced4949',
    scope: 'everything GET PATCH',
    disableIdTokenValidation: true,
    secureRoutes: [environment.allowedUrl],
    ...commonConfigDev,
  },
];

export const useHash = false;
export const useSilentRefreshForCodeFlow = false;
export const BASE_URL = new InjectionToken<string>('BASE_URL');
