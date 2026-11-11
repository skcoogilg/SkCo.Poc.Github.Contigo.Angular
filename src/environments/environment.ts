import { LogLevel, OpenIdConfiguration } from 'angular-auth-oidc-client';

const eventHubsProps = {
  servicebusNamespace: 'skco-event-dev',
  sasKey: '', // PoC: secreto removido (inyectar desde GitHub Secrets si se necesita)
  sasKeyName: 'Access-queue-data-analitycs',
  endpointEvents: 'servicebus.windows.net/queue-data-analitycs/messages',
  apiVersion: '2014-01',
};

export const environment = {
  production: false,
  //APIs CONTIGO
  baseEnvApimUrl: 'https://apisstg.skandia.com.co',
  clientId: '172eceef-d106-4d55-bb43-0fa8d26bf760',
  //EVENT HUBS
  ...eventHubsProps,
};

export const configBootstrap = {
  bootstrap: [],
};

const commonAuthorityUrl =
  'https://skcotest.b2clogin.com/skcotest.onmicrosoft.com/B2C_1A_signin_Service';
const commonIssuerUrl =
  'https://skcotest.b2clogin.com/0db6dbc3-6908-4517-a7f2-81ea685a25e2/v2.0/';
const commonClientId = 'ad7edfc6-a467-40e1-a548-13514d428ada';
const secureApiRoutes = [
  `${environment.baseEnvApimUrl}/SkCo.ContigoClient.Api/v2/`,
  `${environment.baseEnvApimUrl}/SkCo.UsersContigo.Api/v1`,
  `${environment.baseEnvApimUrl}/SkCo.ContractsClient.Contigo.Api/v1/`,
  `${environment.baseEnvApimUrl}/SkCo.FichaReformaContigo.API/v1/`,
];

const commonAuthWellknownEndpoints = {
  issuer: commonIssuerUrl,
  authorizationEndpoint: `${commonAuthorityUrl}/oauth2/v2.0/authorize`,
  tokenEndpoint: `${commonAuthorityUrl}/oauth2/v2.0/token`,
  jwksUri: `${commonAuthorityUrl}/discovery/v2.0/keys`,
  userInfoEndpoint: `${commonAuthorityUrl}/openid/v2.0/userinfo`,
};

const redirectUrl = window.location.origin.includes('contigo')
  ? window.location.origin + '/inicio'
  : window.location.origin + '/index.html';

const commonOauthConf: OpenIdConfiguration[] = [
  {
    configId: 'sensedia',
    authority: `${commonAuthorityUrl}/v2.0`,
    authWellknownEndpoints: commonAuthWellknownEndpoints,
    redirectUrl: redirectUrl,
    clientId: commonClientId,
    scope: `${commonClientId} profile email offline_access openid`,
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    ignoreNonceAfterRefresh: true,
    disableIdTokenValidation: true,
    issValidationOff: false, // this needs to be true if using a common endpoint in Azure
    autoUserInfo: false,
    logLevel: LogLevel.Error,

    secureRoutes: secureApiRoutes,
  },
];

export const oauthConf = commonOauthConf;
