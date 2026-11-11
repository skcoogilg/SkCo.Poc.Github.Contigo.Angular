import { TestBed } from '@angular/core/testing';
import { SortingTableService } from './sorting-table.service';

describe('SortingTableService', () => {
  let service: SortingTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingTableService],
    });
    service = TestBed.inject(SortingTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // =============================
  // compare methods
  // =============================

  it('should compare strings ascending and descending', () => {
    expect(service.compareStrings('A', 'B', true)).toBeLessThan(0);
    expect(service.compareStrings('A', 'B', false)).toBeGreaterThan(0);
  });

  it('should compare numbers ascending and descending', () => {
    expect(service.compareNumbers(1, 2, true)).toBeLessThan(0);
    expect(service.compareNumbers(1, 2, false)).toBeGreaterThan(0);
  });

  it('should compare dates ascending and descending', () => {
    const d1 = new Date('2024-01-01');
    const d2 = new Date('2024-02-01');

    expect(service.compareDates(d1, d2, true)).toBeLessThan(0);
    expect(service.compareDates(d1, d2, false)).toBeGreaterThan(0);
  });

  // =============================
  // String sorting
  // =============================

  it('should sort by string without valueSelect (contracts)', () => {
    const sortFn = service.getSortFunction('any', 'String', true);

    const a = { nameFund: 'Alpha' };
    const b = { nameFund: 'Beta' };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort by string with valueSelect = 0 (monitor)', () => {
    const sortFn = service.getSortFunction('any', 'String', true, 0);

    const a = { infoPortf: { nombreFondo: 'Alpha' } };
    const b = { infoPortf: { nombreFondo: 'Beta' } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort by string with valueSelect != 0 (historic)', () => {
    const sortFn = service.getSortFunction('any', 'String', true, 5);

    const a = { infoPortfHistoric: { nombreFondo: 'Alpha' } };
    const b = { infoPortfHistoric: { nombreFondo: 'Beta' } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  // =============================
  // Number sorting
  // =============================

  it('should sort number without valueSelect', () => {
    const sortFn = service.getSortFunction('saldo', 'Number', true);

    const a = { TotalValue: 100 };
    const b = { TotalValue: 200 };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort number for monitor (%Monitor, valueSelect = 0)', () => {
    const sortFn = service.getSortFunction('%Monitor', 'Number', true, 0);

    const a = { infoPortf: { porcentFondo: 10 } };
    const b = { infoPortf: { porcentFondo: 20 } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort number for table (valueSelect = 0)', () => {
    const sortFn = service.getSortFunction('SaldoActual', 'Number', true, 0);

    const a = { infoTable: { fvaluetotal: 100 } };
    const b = { infoTable: { fvaluetotal: 200 } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort number for historic (%Monitor, valueSelect = 5)', () => {
    const sortFn = service.getSortFunction('%Monitor', 'Number', true, 5);

    const a = { infoPortfHistoric: { porcentFondo: 10 } };
    const b = { infoPortfHistoric: { porcentFondo: 20 } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should throw error for unsupported comparison branch', () => {
    const sortFn = service.getSortFunction('invalid', 'Number', true, 99);

    const a = {};
    const b = {};

    expect(() => sortFn(a, b)).toThrowError('Unsupported comparison');
  });

  // =============================
  // Date sorting
  // =============================

  it('should sort date for table (valueSelect = 0, FechaInicial)', () => {
    const sortFn = service.getSortFunction('FechaInicial', 'Date', true, 0);

    const a = { infoTable: { idate: '2024-01-01' } };
    const b = { infoTable: { idate: '2024-02-01' } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort date for table (valueSelect = 0, FechaFinal)', () => {
    const sortFn = service.getSortFunction('FechaFinal', 'Date', true, 0);

    const a = { infoTable: { fdate: '2024-01-01' } };
    const b = { infoTable: { fdate: '2024-02-01' } };

    expect(sortFn(a, b)).toBeLessThan(0);
  });

  it('should sort date for historic (valueSelect != 0)', () => {
    const sortFn = service.getSortFunction('FechaInicial', 'Date', true, 5);

    const a = {
      infoPortfHistoric: { firstTransaction: '2024-01-01' },
    };
    const b = {
      infoPortfHistoric: { firstTransaction: '2024-02-01' },
    };

    expect(sortFn(a, b)).toBeLessThan(0);
  });
});
