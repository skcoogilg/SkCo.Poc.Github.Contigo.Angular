export interface CheckboxProperties {
  options: CheckboxOptions[];
  tittle?: string;
  subtittle?: string;
}

export interface CheckboxOptions {
  name: string;
  value: string | number;
}

// ------------- Personalize 'monitor portfolios' -------------------
export interface TablePortfoliosCriteriaLastMove {
  Portafolios: boolean;
  Porcentaje: boolean;
  NumUnidades: boolean;
  FechaInicial: boolean;
  ValUnInicial: boolean;
  SaldoInicial: boolean;
  FechaFinal: boolean;
  ValUniFinal: boolean;
  SaldoActual: boolean;
  RendimientoPesos: boolean;
  RendimientoPorcentaje: boolean;
  TEA: boolean;
  RetornoPond: boolean;
}

export interface TablePortfoliosCriteriaTimeFrame {
  Name: boolean;
  CompositionPercent: boolean;
  UnitNumber: boolean;
  InitialDate: boolean;
  InitialValue: boolean;
  UnitInitValue: boolean;
  FinalDate: boolean;
  UnitFinalValue: boolean;
  FinalValue: boolean;
  Variation: boolean;
  TEA: boolean;
}

export interface TablePortfoliosCriteriaHistoric {
  Portafolios: boolean;
  Porcentaje: boolean;
  NumUnidades: boolean;
  FechaInicial: boolean;
  transacciones: boolean;
  capitalTotal: boolean;
  FechaFinal: boolean;
  ValUniFinal: boolean;
  capitalValorizacion: boolean;
  RendimientoPesos: boolean;
  RendimientoPorcentaje: boolean;
  TEA: boolean;
}
// ------------- Personalize transactions of 'monitor portfolios' -------------------
export interface TableFundTransactions {
  transactionType: boolean;
  effectiveDate: boolean;
  value: boolean;
  capitalValue: boolean;
  performance: boolean;
  contingentAccountInitial: boolean;
  contingentAccount: boolean;
  certificate: boolean;
  exent: boolean;
  contributionTransfer: boolean;
  performancePercentage: boolean;
}

export interface TableFicsTransactions {
  transactionType: boolean;
  effectiveDate: boolean;
  value: boolean;
}
