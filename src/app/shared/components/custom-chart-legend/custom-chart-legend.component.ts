import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

/**
 * Custom chart legend component.
 * Shows series chips and arrows if content overflows horizontally.
 */
@Component({
  selector: 'app-custom-chart-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-chart-legend.component.html',
  styleUrls: ['./custom-chart-legend.component.scss'],
})
export class CustomChartLegendComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  /** Chart series data */
  @Input() series: any[] = [];

  /** Active state per series */
  @Input() activeSeries: Record<string, boolean> = {};

  /** Emits the series name when toggled */
  @Output() toggle = new EventEmitter<string>();

  /** Legend container element */
  @ViewChild('legendContainer') legendContainer!: ElementRef<HTMLDivElement>;

  /** Whether to show scroll arrows */
  showArrows = false;

  /** Resize observer to detect container changes */
  private resizeObserver!: ResizeObserver;

  /** Setup resize observer and check initial overflow */
  ngAfterViewInit(): void {
    if (!this.legendContainer) return;

    this.resizeObserver = new ResizeObserver(() => this.checkOverflow());
    this.resizeObserver.observe(this.legendContainer.nativeElement);

    setTimeout(() => this.checkOverflow(), 0);
  }

  /** Recheck overflow when series input changes */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] && this.legendContainer) {
      setTimeout(() => this.checkOverflow(), 0);
    }
  }

  /** Check if content overflows horizontally */
  checkOverflow(): void {
    if (!this.legendContainer) return;

    const el = this.legendContainer.nativeElement;
    this.showArrows = el.scrollWidth > el.clientWidth;
  }

  /**
   * Scroll legend horizontally
   * @param offset pixels to scroll (+ right, - left)
   */
  scroll(offset: number): void {
    if (!this.legendContainer) return;

    this.legendContainer.nativeElement.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  }

  /**
   * Emit toggle event for a series
   * @param name series name
   */
  toggleSerie(name: string): void {
    this.toggle.emit(name);
  }

  /**
   * Handle mouse wheel to scroll horizontally
   * @param event WheelEvent
   */
  onWheel(event: WheelEvent): void {
    if (!this.legendContainer) return;

    event.preventDefault();

    const el = this.legendContainer.nativeElement;
    el.scrollBy({
      left: event.deltaY,
      behavior: 'smooth',
    });
  }

  /** Disconnect observer when component is destroyed */
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
