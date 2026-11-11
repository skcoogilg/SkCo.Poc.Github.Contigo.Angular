import { DecimalPipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[randomUntilValue]',
  providers: [DecimalPipe], // importante
  standalone: true,
})
export class RandomUntilValueDirective implements OnChanges, OnDestroy {
  @Input('randomUntilValue') value: any;
  @Input() min = 0;
  @Input() max = 9999;
  @Input() interval = 80;
  @Input() format: string = '1.0-2'; // igual que el pipe "number:'1.0-2'"

  private running = false;
  private timer: any;

  constructor(private el: ElementRef, private decimalPipe: DecimalPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    const newVal = this.toNumber(this.value);

    if (newVal === null) {
      // Aún no hay dato real → animación random
      if (!this.running) this.startRandomMode();
    } else {
      // Llega el dato real → detener random y mostrar valor real
      this.stopRandomMode();
      this.el.nativeElement.textContent = this.decimalPipe.transform(
        newVal,
        this.format
      );
    }
  }

  ngOnDestroy(): void {
    this.stopRandomMode();
  }

  private startRandomMode(): void {
    this.running = true;
    this.timer = setInterval(() => {
      const random = this.randomNumber(this.min, this.max);
      this.el.nativeElement.textContent = this.decimalPipe.transform(
        random,
        this.format
      );
    }, this.interval);
  }

  private stopRandomMode(): void {
    this.running = false;
    if (this.timer) clearInterval(this.timer);
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private toNumber(val: any): number | null {
    if (val === null || val === undefined || val === '') return null;
    const n = Number(val);
    return isNaN(n) ? null : n;
  }
}
