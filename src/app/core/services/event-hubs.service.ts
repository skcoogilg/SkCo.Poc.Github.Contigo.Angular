import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import {
  EventHubMessage,
  VariablesMessage,
} from '@interfaces/event-hubs-message.interface';
import {
  browserInfoService,
  createUUID,
  getDeviceId,
} from '@sharedUtils/event-hubs';
import { catchError, firstValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AgentClientInfoService } from './agent-client-info.service';

@Injectable({
  providedIn: 'root',
})
export class EventHubsService {
  //Dependencias
  private readonly _http = inject(HttpClient);
  private readonly _agentClientSvc = inject(AgentClientInfoService);

  private readonly _dataAgent = this._agentClientSvc.getDataAgent();
  private readonly _dataClient = this._agentClientSvc.getDataClient();

  createSASToken(): string {
    const encoded = encodeURIComponent(
      'https://' + environment.servicebusNamespace + '.servicebus.windows.net'
    );
    const now = new Date();
    const minute = 60;
    const ttl = Math.round(now.getTime() / 1000) + minute;
    const signature = encoded + '\n' + ttl;
    const hash = CryptoJS.HmacSHA256(signature, environment.sasKey).toString(
      CryptoJS.enc.Base64
    );
    return (
      'SharedAccessSignature sr=' +
      encoded +
      '&sig=' +
      encodeURIComponent(hash) +
      '&se=' +
      ttl +
      '&skn=' +
      environment.sasKeyName
    );
  }

  async createEventHubMessage(
    data: VariablesMessage
  ): Promise<EventHubMessage> {
    const bowserResult = browserInfoService();
    const ip = localStorage.getItem('ip');
    const message: EventHubMessage = {
      id: createUUID(),
      deviceId: await getDeviceId(ip || ''),
      sessionId: createUUID(),
      ip: ip || '',
      url: location.href,
      eventDatetime: new Date().toISOString(),
      browserName: bowserResult.browserName,
      isMobile: bowserResult.isMobile,
      operatingSystem: bowserResult.operatingSystem,
      eventCategory: data.eventCategory,
      eventName: data.eventName,
      channel: 'Portal Contigo',
      txData: {
        operation: data.operation,
        operationTime: new Date().toISOString(),
        operationResult: data.operationResult,
        txComplementData: data.txComplementData,
      },
      userData: {
        userDocNumber: data.userDoc,
        userDocType: data.userDocType,
        userMail: data.user,
      },
    };
    return message;
  }

  async addEventHub(schema: any) {
    const token = localStorage.getItem('sasToken') || '';
    return firstValueFrom(
      this._http
        .post(
          `https://${environment.servicebusNamespace}.${environment.endpointEvents}?api-version=${environment.apiVersion}`,
          schema,
          {
            headers: new HttpHeaders({
              Authorization: token,
            }),
          }
        )
        .pipe(
          catchError((err) => {
            if (err.includes('401')) {
              this.refreshSASToken(schema);
            }
            return err;
          })
        )
    );
  }

  refreshSASToken(lastSchema?: any) {
    const newToken = this.createSASToken();
    localStorage.setItem('sasToken', newToken);
    if (lastSchema) {
      setTimeout(async () => {
        await this.addEventHub(lastSchema);
      }, 0);
    }
  }

  async sendEventHubEvent(
    operation: string,
    category?: string,
    event?: string
  ) {
    try {
      const data: VariablesMessage = {
        clientDoc: this._dataClient()?.doc || '',
        user: this._dataAgent?.email || '',
        userDoc: this._dataAgent?.doc || '',
        userDocType: this._dataAgent?.docType || '',
        agentTypeDescription: this._dataAgent?.agentTypeDescription || '',
        eventCategory: category ?? 'Pestaña Productos',
        eventName: event ?? '',
        operation: operation ?? 'Vista ficha',
        operationResult: 'Exitosa',
        txComplementData: [
          {
            key: 'Item de consulta',
            value: operation,
          },
          {
            key: 'Nombre cliente',
            value: this._dataClient()?.names || '',
          },
          {
            key: 'Tipo documento cliente',
            value: this._dataClient()?.docType || '',
          },
          {
            key: 'Número de documento cliente',
            value: this._dataClient()?.doc || '',
          },
          {
            key: 'Relacion con el cliente',
            value: this._dataClient()?.relation || '',
          },
        ],
      };
      const message = await this.createEventHubMessage(data);
      await this.addEventHub(message);
    } catch (error) {
      console.error(error);
      console.error('Ocurrió un error al enviar el event hub');
    }
  }
}
