// event-hubs.service.spec.ts
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventHubsService } from './event-hubs.service';
import { AgentClientInfoService } from './agent-client-info.service';
import * as EventHubsUtils from '@sharedUtils/event-hubs';
import { Signal, signal } from '@angular/core';

class EventHubsUtilsMock {
  createUUID = jasmine.createSpy().and.returnValue('uuid123');

  getDeviceId = jasmine.createSpy().and.returnValue('device123');

  browserInfoService = jasmine.createSpy().and.returnValue({
    browserName: 'Chrome',
    isMobile: false,
    operatingSystem: 'Windows',
  });
}

describe('EventHubsService', () => {
  let service: EventHubsService;
  let agentServiceMock: jasmine.SpyObj<AgentClientInfoService>;

  beforeEach(() => {
    const agentSpy = jasmine.createSpyObj('AgentClientInfoService', [
      'getDataAgent',
      'getDataClient',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AgentClientInfoService, useValue: agentSpy },
        { provide: EventHubsUtils, useValue: EventHubsUtilsMock },
      ],
    });

    service = TestBed.inject(EventHubsService);
    agentServiceMock = TestBed.inject(
      AgentClientInfoService,
    ) as jasmine.SpyObj<AgentClientInfoService>;

    // Mock del cliente usando Signal<Client>
    const clientSignal: Signal<any> = signal({
      names: 'Cliente Prueba',
      relation: 'Titular',
      doc: '987654321',
      docType: 'CC',
      AcademicLevel: null,
      AdressInfo: { JobAdress: 'Calle 123', LocalAdress: 'Barrio Prueba' },
      CellPhone: '3001234567',
      CivilStatus: 'Soltero',
      CreatedDate: new Date(),
      DateExpeditionDoc: '2000-01-01',
      birthDate: '1990-05-05',
      PhonesInfo: { JobPhone: '123456', ResidencialPhone: '654321' },
      Profession: 'Ingeniero',
      RiskProfile: 'Medio',
      Segment: 'VIP',
      Sex: 'M',
      Enterprise: null,
      Marcacion: null,
      Email: 'cliente@test.com',
    });
    agentServiceMock.getDataClient.and.returnValue(clientSignal);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sasToken') return 'token123';
      if (key === 'ip') return '127.0.0.1';
      return null;
    });
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  afterEach(() => {
    // Limpiar reloj de jasmine si se usa
    jasmine.clock().uninstall();
  });

  it('debería generar un SAS token correctamente', () => {
    const token = service.createSASToken();
    expect(token).toContain('SharedAccessSignature sr=');
    expect(token).toContain('&sig=');
    expect(token).toContain('&se=');
    expect(token).toContain('&skn=');
  });

  it('debería crear un mensaje completo con datos del agente y cliente', async () => {
    const txComplement = [{ key: 'test', value: 'data' }];
    const variablesMessage = {
      clientDoc: '987654321',
      user: 'agent@test.com',
      userDoc: '123456789',
      userDocType: 'CC',
      agentTypeDescription: 'Agente Comercial',
      eventCategory: 'TestCategory',
      eventName: 'TestEvent',
      operation: 'OpTest',
      operationResult: 'Exitosa',
      txComplementData: txComplement,
    };

    const message = await service.createEventHubMessage(variablesMessage);

    expect(message.txData.operationResult).toBe('Exitosa');
  });

  it('debería generar un nuevo token y llamar addEventHub', () => {
    spyOn(service, 'addEventHub').and.returnValue(Promise.resolve());

    jasmine.clock().install(); // Habilitar reloj de Jasmine
    spyOn(service, 'createSASToken').and.returnValue('newToken123');

    service.refreshSASToken({ sample: 'data' });

    expect(service.createSASToken).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'sasToken',
      'newToken123',
    );

    jasmine.clock().tick(1); // Ejecutar setTimeout
    expect(service.addEventHub).toHaveBeenCalledWith({ sample: 'data' });

    jasmine.clock().uninstall();
  });

  xit('debería enviar un evento usando createEventHubMessage y addEventHub', fakeAsync(() => {
    spyOn(service, 'createEventHubMessage').and.callThrough();
    spyOn(service, 'addEventHub').and.returnValue(Promise.resolve('ok'));

    service.sendEventHubEvent('OpTest', 'TestCategory', 'TestEvent');
    tick(500);

    expect(service.createEventHubMessage).toHaveBeenCalled();
    expect(service.addEventHub).toHaveBeenCalled();
    expect(EventHubsUtils.createUUID).toHaveBeenCalled();
    expect(EventHubsUtils.getDeviceId).toHaveBeenCalled();
    expect(EventHubsUtils.browserInfoService).toHaveBeenCalled();
  }));
});
