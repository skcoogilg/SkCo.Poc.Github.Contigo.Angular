import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomChartLegendComponent } from './custom-chart-legend.component';

describe('CustomChartLegendComponent', () => {
  let component: CustomChartLegendComponent;
  let fixture: ComponentFixture<CustomChartLegendComponent>;

  const mockSeries = [
    {
      name: 'Fondo Conservador',
      itemStyle: { color: '#ff0000' },
    },
    {
      name: 'Fondo Moderado',
      itemStyle: { color: '#00ff00' },
    },
  ];

  const mockActive = {
    'Fondo Conservador': true,
    'Fondo Moderado': false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomChartLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomChartLegendComponent);
    component = fixture.componentInstance;
    component.series = mockSeries;
    component.activeSeries = { ...mockActive };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render legend chips', () => {
    const chips = fixture.debugElement.queryAll(By.css('.legend-chip'));
    expect(chips.length).toBe(2);
  });

  it('should apply disabled class correctly', () => {
    const chips = fixture.debugElement.queryAll(By.css('.legend-chip'));

    expect(chips[0].nativeElement.classList.contains('disabled')).toBeFalse();
    expect(chips[1].nativeElement.classList.contains('disabled')).toBeTrue();
  });

  it('should emit toggle event when chip is clicked', () => {
    spyOn(component.toggle, 'emit');

    const chip = fixture.debugElement.query(By.css('.legend-chip'));
    chip.nativeElement.click();

    expect(component.toggle.emit).toHaveBeenCalledWith('Fondo Conservador');
  });

  it('should hide arrows if no overflow', () => {
    const container = component.legendContainer.nativeElement;

    Object.defineProperty(container, 'scrollWidth', { value: 100 });
    Object.defineProperty(container, 'clientWidth', { value: 200 });

    component.checkOverflow();
    fixture.detectChanges();

    expect(component.showArrows).toBeFalse();
  });

  it('should show arrows if there is overflow', () => {
    const container = component.legendContainer.nativeElement;

    Object.defineProperty(container, 'scrollWidth', { value: 300 });
    Object.defineProperty(container, 'clientWidth', { value: 100 });

    component.checkOverflow();
    fixture.detectChanges();

    expect(component.showArrows).toBeTrue();
  });

  it('should not break if series is empty', () => {
    component.series = [];
    fixture.detectChanges();

    const chips = fixture.debugElement.queryAll(By.css('.legend-chip'));
    expect(chips.length).toBe(0);
  });

  it('scroll without legendContainer', () => {
    const returnError = component.scroll(100);
    expect(returnError).toBeUndefined();
  });

  it('onWheel without legendContainer', () => {
    const event = new WheelEvent('wheel');
    const returnError = component.onWheel(event);
    expect(returnError).toBeUndefined();
  });
});
