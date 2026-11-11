import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectOptions } from '@interfaces/select.interface';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockOptions: SelectOptions[] = [
    { value: '1', name: 'Opción 1', code: 'OPTION1' },
    { value: '2', name: 'Opción 2', code: 'OPTION2' },
    { value: '3', name: 'Opción 3', code: 'OPTION3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    component.selectedValue = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all options', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(mockOptions.length);
    expect(options[0].nativeElement.textContent).toContain('Opción 1');
  });

  it('should bind selectedValue correctly', () => {
    const selectEl: HTMLSelectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;
    expect(Number(selectEl.value)).toBe(1);
  });
});
