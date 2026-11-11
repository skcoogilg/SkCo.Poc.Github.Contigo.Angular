import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { EventHubsService } from '@services/event-hubs.service';
import { PAGE_HERO } from './page.constants';

@Component({
  selector: 'app-page',
  standalone: true,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  private readonly eventHubService = inject(EventHubsService);

  protected readonly hero = PAGE_HERO;
  protected readonly envName = environment.envName;

  /**
   * Send event to Event Hub
   * @param number
   * @param productName
   */
  eventHub(number: string, productName: string): void {
    this.eventHubService.sendEventHubEvent('Operación', 'Categoríá', `Evento`);
  }
}
