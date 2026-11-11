import { FullTableOptions } from '@sharedComponents/full-table/interfaces/full-table';

export interface InsurancePrimasData {
  pagadas: number;
  valorPagadas: number;
  noPagadas: number;
  valorNoPagadas: number;
  transactions: InsurancePrimasTransaction[];
  objetivoAhorro: number;
  valorPrima: number;
  fechadebito: string;
  pagadasAnticipado: number;
  valorPagadasAnticipado: number;
}

export interface InsurancePrimasTransaction {
  numeroDePoliza: string;
  primaDesde: string;
  primaHasta: string;
  valorPrima: number;
  fechaAcreditacion: string;
  estadoPago: string;
  vigency?: string;
}

export interface InsuranceHeader {
  sumaAsegurada: string;
}

export interface InsuranceAutomaticDebitData {
  nombreCuentaActual: string;
  numeroCuentaActual: string;
  automaticDebitTab: InsuranceAutomaticDebit[];
}

export interface InsuranceAutomaticDebit {
  nombre: string;
  cuenta: string;
  fechaDebitoAutomatico: string;
  primerDebito: string;
  monto: number;
  intentosfallidos: number;
  debitos: InsuranceAutomaticDebitTransaction[];
  // Llaves adicionales
  accountType?: string;
  bankName?: string;
  bankImg?: string;
  formattedAccount?: string;
  tableOptions: FullTableOptions;
  isActive?: boolean;
}

export interface InsuranceAutomaticDebitTransaction {
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  fechaDebito: string;
  estado: string;
  nombreCuenta: string;
  numeroCuenta: string;
  detalle: string;
  vigency?: string;
}

export interface InsuranceStatusReportPdf {
  fileName: string;
  fileType: string;
  base64Content: string;
}

export interface InsuranceDetailData {
  coverages: any;
  beneficiaries: InsuranceDetailBeneficiaries[];
  totalBeneficiariesPercent?: number;
  duePremiumDetail: InsurancePremiumPrima[];
  premiumSummary: InsurancePremiumPrima[];
  monthlyPremium: number;
  reachedAmount: number;
  renewalCount: number;
  savingBook: number;
  secondaryNumber: number;
  target: number;
  term: number;
  agentId: number;
  balance: number;
  goalId: number;
  insuredAmount: number;
  number: number;
  objective: string;
  validEndDate: string;
  validStartDate: string;
  name: string;
  goalText: string;
  balanceDate: string;
  docNumber: string;
  docType: string;
  effectiveDate: string;
  planCode: string;
  productCode: string;
  reference: string;
  startDate: string;
  statusCode: string;
  statusName: string;
  isManaged: boolean;
  periodicity: string;
  mappedPeriodicity: string;
  intermediary: string;
}

export interface InsuranceDetailBeneficiaries {
  isOnerous: boolean;
  kinship: string;
  name: string;
  percent: number;
}

export interface InsurancePremiumPrima {
  name: string;
  amount: number;
  date?: string;
  quantity?: number;
}
