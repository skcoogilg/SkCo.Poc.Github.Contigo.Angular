import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import {
  OidcSecurityService,
  PublicEventsService,
} from 'angular-auth-oidc-client';
import { CryptoCipherService as CryptoCipherServiceSkLibrary } from 'skandia-authencrypt'; // PoC: alias por API de 1.7.9 (npm público)
import { AgentClientInfoService } from '@services/agent-client-info.service';
import { VariableService } from '@services/variable.service';
import { ContractsService } from '@services/contracts.service';
import { PageComponent } from './ui/page/page.component';
import { signal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// 🔹 Mocks de servicios
class OidcSecurityServiceMock {
  checkAuthMultiple = jasmine.createSpy().and.returnValue(of([]));
  isAuthenticated$ = of(true);
  getAccessToken = jasmine.createSpy().and.returnValue(of('fakeToken'));
  authorize = jasmine.createSpy();
  forceRefreshSession = jasmine.createSpy().and.returnValue(of(true));
}

class PublicEventsServiceMock {
  registerForEvents = jasmine
    .createSpy()
    .and.returnValue(of({ type: 'TestEvent' }));
}

class CryptoCipherServiceSkLibraryMock {}
class AgentClientInfoServiceMock {
  getDataClient = signal(jasmine.createSpy());
  setDataClient = jasmine.createSpy();
  getDataAgent = signal(jasmine.createSpy());
}
class VariableServiceMock {
  setSelectedProduct = jasmine.createSpy();
  getSelectedProduct = signal(jasmine.createSpy());
  setTabSelectedMobile = signal(jasmine.createSpy());
  getTabSelectedMobile = signal(jasmine.createSpy());
}
class ContractsServiceMock {
  fetchDataUrlPipelineContract = jasmine.createSpy();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let oidcService: OidcSecurityServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        { provide: OidcSecurityService, useClass: OidcSecurityServiceMock },
        { provide: PublicEventsService, useClass: PublicEventsServiceMock },
        {
          provide: CryptoCipherServiceSkLibrary,
          useClass: CryptoCipherServiceSkLibraryMock,
        },
        {
          provide: AgentClientInfoService,
          useClass: AgentClientInfoServiceMock,
        },
        { provide: VariableService, useClass: VariableServiceMock },
        { provide: ContractsService, useClass: ContractsServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    oidcService = TestBed.inject(
      OidcSecurityService,
    ) as unknown as OidcSecurityServiceMock;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería detectar un token expirado', () => {
    const expiredToken = btoa(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 100 }),
    );
    const token = `fake.${expiredToken}.sig`;
    spyOn<any>(component, 'isTokenExpired').and.callThrough();

    expect(component.isTokenExpired(token)).toBeTrue();
  });

  it('debería detectar un token válido', () => {
    const validToken = btoa(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 1000 }),
    );
    const token = `fake.${validToken}.sig`;

    expect(component.isTokenExpired(token)).toBeFalse();
  });

  it('debería intentar renovar token en handleRenewTokenError', () => {
    component['configId'] = 'testConfig';
    component['authParams'] = { customParams: {} };

    component.handleRenewTokenError();
    expect(oidcService.forceRefreshSession).toHaveBeenCalled();
  });

  it('debería llamar a authorize si falla forceRefreshSession', () => {
    oidcService.forceRefreshSession.and.returnValue(
      throwError(() => new Error('fail')),
    );

    component['configId'] = 'testConfig';
    component['authParams'] = { customParams: {} };

    component.handleRenewTokenError();
    expect(oidcService.authorize).toHaveBeenCalledWith('testConfig', {
      customParams: {},
    });
  });
});
