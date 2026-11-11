import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearcherComponent } from './searcher.component';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title empty', () => {
    expect(component.tittle).toBe('');
  });

  it('should accept @Input() tittle', () => {
    component.tittle = 'Buscar usuario';
    fixture.detectChanges();
    expect(component.tittle).toBe('Buscar usuario');
  });

  it('should emit criteria when searchCriteria is called', () => {
    spyOn(component.criteria, 'emit');
    component.searchCriteria('Angular');
    expect(component.criteria.emit).toHaveBeenCalledWith('Angular');
  });

  it('should emit criteria when input changes (integration test)', () => {
    spyOn(component.criteria, 'emit');

    // simular que en el HTML hay un input y llamamos al método
    const value = 'Karma';
    component.searchCriteria(value);

    expect(component.criteria.emit).toHaveBeenCalledTimes(1);
    expect(component.criteria.emit).toHaveBeenCalledWith(value);
  });
});
