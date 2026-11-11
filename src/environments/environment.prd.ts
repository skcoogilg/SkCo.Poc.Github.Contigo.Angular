import { InjectionToken } from '@angular/core';
import { OpenIdConfiguration, LogLevel } from 'angular-auth-oidc-client';

const eventHubsPrd = {
  servicebusNamespace: 'skco-event-dev',
  sasKey: '', // PoC: secreto removido (inyectar desde GitHub Secrets si se necesita)
  sasKeyName: 'Access-queue-skandia-analitycs',
  endpointEvents: 'servicebus.windows.net/queue-skandia-analitycs/messages',
  apiVersion: '2014-01',
};

export const environment = {
  production: true,
  bootstrap: [],
  baseEnvApimUrl: 'https://apis.skandia.com.co',
  environmentOauth: 'prd',
  clientId: '82021979-4187-40d2-927e-e7079d0a1106',
  allowedUrl:
    'https://contigo.skandia.co/o/headless-admin-user/v1.0/user-accounts',
  useValue: 'https://contigo.skandia.co',
  //EVENT HUBS
  ...eventHubsPrd,
};

export const configBootstrap = {
  bootstrap: [],
};

const prdAuthorityUrl =
  'https://skauthdist.b2clogin.com/skauthdist.onmicrosoft.com/B2C_1A_signin_Service';
const prdIssuerUrl =
  'https://skauthdist.b2clogin.com/427d02b1-23ea-4005-b967-6743efc3dd54/v2.0/';
const prdClientId = 'ca72032a-631a-451b-bca7-97e0349aaec5';

const prdAuthWellknownEndpoints = {
  issuer: prdIssuerUrl,
  authorizationEndpoint: `${prdAuthorityUrl}/oauth2/v2.0/authorize`,
  tokenEndpoint: `${prdAuthorityUrl}/oauth2/v2.0/token`,
  jwksUri: `${prdAuthorityUrl}/discovery/v2.0/keys`,
  userInfoEndpoint: `${prdAuthorityUrl}/openid/v2.0/userinfo`,
};

const prdSecureApiRoutes = [
  `${environment.baseEnvApimUrl}/SkCo.ContigoClient.Api/v2/`,
  `${environment.baseEnvApimUrl}/SkCo.UsersContigo.Api/v1`,
  `${environment.baseEnvApimUrl}/SkCo.ContractsClient.Contigo.Api/v1/`,
  `${environment.baseEnvApimUrl}/SkCo.FichaReformaContigo.API/v1/`,
];

const authorityPathPrd = 'https://contigo.skandia.co/o/oauth2/authorize';
const redirectUrlPrd = window.location.origin.includes('contigo')
  ? window.location.origin + '/inicio'
  : window.location.origin + '/index.html';

const commonConfigPrd = {
  redirectUrl: redirectUrlPrd,
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
    authority: `${prdAuthorityUrl}/v2.0`,
    authWellknownEndpoints: prdAuthWellknownEndpoints,
    clientId: prdClientId,
    scope: `${prdClientId} profile email offline_access openid`,
    disableIdTokenValidation: true,
    secureRoutes: prdSecureApiRoutes,
    ...commonConfigPrd,
  },
  {
    configId: 'liferay',
    authority: authorityPathPrd,
    authWellknownEndpoints: {
      issuer: authorityPathPrd,
      authorizationEndpoint: authorityPathPrd,
      tokenEndpoint: 'https://contigo.skandia.co/o/oauth2/token',
      jwksUri:
        'https://skauthdist.b2clogin.com/skauthdist.onmicrosoft.com/B2C_1A_signin_Service/discovery/v2.0/keys',
    },
    clientId: 'id-19325c83-356b-c588-6e6e-fb73bf4e278',
    scope: 'everything GET PATCH',
    disableIdTokenValidation: true,
    secureRoutes: [environment.allowedUrl],
    ...commonConfigPrd,
  },
];

export const useHash = false;
export const useSilentRefreshForCodeFlow = false;
export const BASE_URL = new InjectionToken<string>('BASE_URL');
