import { inject, Injectable, Signal, signal } from '@angular/core';
import { CryptoCipherService as CryptoCipherServiceSkLibrary } from 'skandia-authencrypt'; // PoC: alias por API de 1.7.9 (npm público)
import { Agent } from '@interfaces/agent.interface';
import { Client } from '@interfaces/client-info.interface';
import { decryptFromLocalStorage } from '@sharedUtils/sk-descrypt-library';

@Injectable({
  providedIn: 'root',
})
export class AgentClientInfoService {
  private readonly cryptoCipherServiceSkLibrary = inject(
    CryptoCipherServiceSkLibrary
  );

  private _dataClient = signal<Client | null>(null);
  private readonly _agent: string | null = decryptFromLocalStorage(
    'infoAgentT',
    this.cryptoCipherServiceSkLibrary
  );

  private readonly _dataAgent: Agent | null = this._agent
    ? (this._agent as unknown as Agent)
    : null;

  getDataClient(): Signal<Client | null> {
    return this._dataClient;
  }

  setDataClient(data: Client): void {
    this._dataClient.set(data);
  }

  getDataAgent(): Agent | null {
    return this._dataAgent;
  }
}
