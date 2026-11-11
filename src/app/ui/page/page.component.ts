import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventHubsService } from '@services/event-hubs.service';

const MODULES = [CommonModule];

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [MODULES],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  private readonly eventHubService = inject(EventHubsService);

  constructor() {}

  /**
   * Send event to Event Hub
   * @param number
   * @param productName
   */
  eventHub(number: string, productName: string): void {
    this.eventHubService.sendEventHubEvent('Operación', 'Categoríá', `Evento`);
  }
}
