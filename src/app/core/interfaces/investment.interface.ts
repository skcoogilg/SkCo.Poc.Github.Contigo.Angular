import { Observable } from 'rxjs';
import { ContractMonitor } from './monitor-pro.interface';

export interface InvestSummary {
  reference: string;
  productName: string;
  givenName: string;
  contractType: string;
  status: string;
  contractTea: number;
  isInvested: boolean;
  balance: number;
  agentName: string;
}

export interface InvestDetail {
  program: string;
  initialDate: Date | string;
  profiling: string;
  affiliationDate: Date | string;
  objective: string;
  investmentMix: string;
  balanceDate: string;
  insEffectiveDate: Date | string;
  capitalBalance: number;
  withdrawnBalance: number;
  performance: number;
  performanceWithdrawn: number;
  balanceTotal: number;
  grossInstitutions: number;
  contingentAccount: number;
}

export interface InvestAccount {
  automaticDebit: boolean;
  bank: string;
  accountNumber: string;
  status: string;
  city: string;
  holder: string;
  role: string;
  roleMapped?: string;
}

export interface InvestTransaction {
  code: string;
  transactionType: string;
  effectiveDate: string;
  processDate: string;
  eventNumber: string;
  value: number;
  extendedData?: {
    fecha: string;
    eventNumber: string;
    certificado: string;
    exento: string;
    aporte_Traslado: string;
    saldo_Capital_Inicial: number;
    saldo_Capital: number;
    saldo_Rendimientos: number;
    cuenta_Contingente_Inicial: number;
    cuenta_Contingente: number;
    porcentage_Rend: number;
  };
}

export interface InvestTransactionMapped {
  transactionType: string;
  transactionTypeMapped?: string;
  effectiveDate: string;
  value: number;
  capitalValue: number;
  performance: number;
  contingentAccount: number;
  contingentAccountInitial: number;
  certificate: string;
  exent: string;
  contributionTransfer: string;
  performancePercentage: number;
  code: string;
  eventNumber: string;
  processDate: string;
  nroEvento?: string;
  nroTransaccion?: string;
  fechaEfectivaStr?: string;
  fechaProcesoStr?: string;
}

export interface InvestStandingPortfolio {
  porcentFondo: number;
  nombreFondo: string;
  idFondo: string;
  fechaEfectiva: string;
  name?: string;
  colorTag?: string;
}

export interface InvestCombination {
  contract: number;
  product: string;
  nameCombination: string;
  description: string;
  profile: string;
}

export interface DataStrategy {
  hasData(): boolean;
  fetchData(contract: ContractMonitor[]): Observable<any[]>;
  setData(portfolios: any[]): void;
}

export interface InvestRetentions {
  porcentaje: string;
  rendimientos: number;
  retencion: number;
}

export interface FicsTransaction {
  tipo: string;
  fecha: string;
  valorNeto: number;
  codigoTransaccion?: string;
}

export interface FicsDetail {
  fechaApertura: string;
  tipoParticipacion: string;
  saldo: number;
  saldoDisponible: number;
  totalUnidades: number | null;
  saldoCapital: number;
  rendimientos: number;
  canje: number;
  retencionTotal: number;
  retirosCargados: number;
  provicionRetiroParcial: number;
  rentasPagadas: number;
  ordenantes: any[];
  terceros: any[];
  comisionAdministracion?: string;
  asesor?: string;
  transacciones: FicsTransaction[];
}

export interface FicsSummary {
  rentasPagadasQuantity: number;
  rentasPagadas: number;
  valorizacion: number;
  rendimientos: number;
  saldo: number;
  tipoParticipacion: string;
  saldoCapital?: number;
  banco: string;
  cuenta: string;
  destinatario: string;
  quantityDividendos: number;
  dividendos: number;
}

export interface AutomaticDebitResponse {
  automaticDebitTab: AutomaticDebit[];
  nombreBancoActivo: string;
  numeroCuentaActiva: string;
}

export interface AutomaticDebit {
  nombre: string;
  cuenta: string;
  fechaDebitoAutomatico: string;
  primerDebito: string;
  monto: number;
  intentosfallidos: number;
  debitos: Debit[];
  hasActions: boolean;
  hasPaginator: boolean;
  disableActionsColumn: boolean;
  isActive: boolean;
  accountType: string;
  bankName: string;
  bankImg: string;
  formattedAccount?: string;
  tableOptions?: any;
  paginator?: {
    currentPage: number;
    pageSize: number | string;
    totalPages: number;
  };
  paginatedDebits?: Debit[];
}

export interface Debit {
  fechaInicio: string;
  fechaFin: string;
  fechaDebito: string;
  valor: number;
  estado: string;
  detalle: string;
  vigency?: string;
  fechaAcreditacion?: Date | string;
}
