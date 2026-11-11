import { TestBed } from '@angular/core/testing';
import {
  TableFundTransactions,
  TablePortfoliosCriteriaHistoric,
  TablePortfoliosCriteriaLastMove,
} from '@interfaces/checkbox.interface';
import { IndexDBService } from './indexDB.service';

describe('IndexDBService', () => {
  let service: IndexDBService;

  const lastMoveMock: TablePortfoliosCriteriaLastMove = {
    Portafolios: true,
    Porcentaje: true,
    NumUnidades: true,
    FechaInicial: true,
    ValUnInicial: true,
    SaldoInicial: true,
    FechaFinal: true,
    ValUniFinal: true,
    SaldoActual: true,
    RendimientoPesos: true,
    RendimientoPorcentaje: true,
    TEA: true,
    RetornoPond: true,
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [IndexDBService],
    });

    service = TestBed.inject(IndexDBService);

    // Limpia completamente la base antes de cada test
    await service.delete();
    await service.open();
  });

  afterEach(async () => {
    await service.delete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a property into monitor table', async () => {
    const result = await service.addPropertyInMonitorTable(1, lastMoveMock);

    expect(result).toBe(1);

    const records = await service.getAllPropertiesOfMonitorTable();
    expect(records.length).toBe(1);
    expect(records[0].id).toBe(1);
    expect(records[0].value).toEqual(lastMoveMock);
  });

  it('should get a specific property', async () => {
    await service.addPropertyInMonitorTable(2, lastMoveMock);

    const result = await service.getSpecificPropertyOfMonitorTable(2);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

  it('should update property completely', async () => {
    const updatedValue: TablePortfoliosCriteriaHistoric = {
      Portafolios: false,
      Porcentaje: false,
      NumUnidades: false,
      FechaInicial: false,
      transacciones: false,
      capitalTotal: false,
      FechaFinal: false,
      ValUniFinal: false,
      capitalValorizacion: false,
      RendimientoPesos: false,
      RendimientoPorcentaje: false,
      TEA: false,
    };

    await service.addPropertyInMonitorTable(3, lastMoveMock);

    await service.updatePropertyInMonitorTable(3, updatedValue);

    const result = await service.getSpecificPropertyOfMonitorTable(3);

    expect(result[0].value).toEqual(updatedValue);
  });

  it('should delete property', async () => {
    await service.addPropertyInMonitorTable(4, lastMoveMock);

    await service.deletePropertyInMonitorTable(4);

    const result = await service.getSpecificPropertyOfMonitorTable(4);

    expect(result.length).toBe(0);
  });

  it('should merge values in updatePropertyTable', async () => {
    const initial: TableFundTransactions = {
      transactionType: true,
      effectiveDate: true,
      value: true,
      capitalValue: true,
      performance: true,
      contingentAccountInitial: true,
      contingentAccount: true,
      certificate: true,
      exent: true,
      contributionTransfer: true,
      performancePercentage: true,
    };

    await service.addPropertyInMonitorTable(5, initial);

    const partialUpdate: Partial<TableFundTransactions> = {
      value: false,
      performance: false,
    };

    await service.updatePropertyTable(5, partialUpdate as any);

    const result = await service.getSpecificPropertyOfMonitorTable(5);

    expect(result[0].value).toEqual({
      ...initial,
      ...partialUpdate,
    });
  });

  it('should return undefined if updating non-existing record', async () => {
    const result = await service.updatePropertyTable(999, lastMoveMock);

    expect(result).toBeUndefined();
  });
});
