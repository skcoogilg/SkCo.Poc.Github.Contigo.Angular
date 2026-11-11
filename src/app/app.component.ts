import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DetailClient } from '@interfaces/detail-client.interface';
import { AgentClientInfoService } from '@services/agent-client-info.service';
import { decryptFromLocalStorage } from '@sharedUtils/sk-descrypt-library';
import {
  EventTypes,
  OidcSecurityService,
  PublicEventsService,
} from 'angular-auth-oidc-client';
import { jwtDecode } from 'jwt-decode';
import { CryptoCipherService as CryptoCipherServiceSkLibrary } from 'skandia-authencrypt'; // PoC: alias por API de 1.7.9 (npm público)
import { PageComponent } from './ui/page/page.component';
const MODULES = [CommonModule];
const COMPONENTS = [PageComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MODULES, COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pocGithubContigo';
  //Dependencias
  private readonly cryptoCipherServiceSkLibrary = inject(
    CryptoCipherServiceSkLibrary,
  );
  public oidcSecurityService = inject(OidcSecurityService);
  private readonly eventService = inject(PublicEventsService);
  private readonly agentClientInfoService = inject(AgentClientInfoService);

  //Variables
  private configId: string | undefined;
  private authParams: any;
  private _client = signal<string | null>(localStorage.getItem('ClienT'));

  constructor() {
    effect(
      () => {
        const dataClient = this._client();
        if (dataClient !== null) {
          const infoClient = decryptFromLocalStorage(
            'ClienT',
            this.cryptoCipherServiceSkLibrary,
          ) as DetailClient;
          this.agentClientInfoService.setDataClient(infoClient);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuthMultiple().subscribe((loginResponses) => {
      loginResponses.forEach(({ isAuthenticated, configId }) => {
        const login_hint = localStorage.getItem('email')!;
        const domain_hint = login_hint?.includes('skandia.com.co')
          ? 'SkCoEntraID'
          : '';

        const authParams = login_hint?.includes('skandia.com.co')
          ? { customParams: { login_hint, domain_hint } }
          : undefined;

        this.configId = configId;
        this.authParams = authParams;

        if (!isAuthenticated) {
          this.oidcSecurityService.authorize(configId, authParams);
        }
      });
    });

    this.eventService.registerForEvents().subscribe((event: any) => {
      if (event.type === EventTypes.SilentRenewFailed) {
        console.error('Error al renovar el token: ', event);
        this.handleRenewTokenError(event);
      }
    });

    this.oidcSecurityService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.oidcSecurityService.getAccessToken().subscribe((token) => {
          if (token) {
            console.info('token valido');
            const isExpiredToken = this.isTokenExpired(token);
            if (isExpiredToken) {
              console.info('token expirado');
              this.handleRenewTokenError();
            }
          } else {
            console.info('token invalido...');
          }
        });
      }
    });
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expiration = decoded.exp;
    const now = Math.floor(new Date().getTime() / 1000);
    return now > expiration;
  }

  handleRenewTokenError(event?: any) {
    // Intentar forzar la renovaciÃ³n del token
    this.oidcSecurityService.forceRefreshSession().subscribe(
      () => {
        console.info('ActualizaciÃ³n de token exitosa');
      },
      (error) => {
        console.error(
          'Error durante la renovaciÃ³n forzada del token: ',
          error,
        );
        if (this.configId && this.authParams) {
          this.oidcSecurityService.authorize(this.configId, this.authParams);
        }
      },
    );
  }
}
