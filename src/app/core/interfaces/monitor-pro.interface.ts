//------------------------------- Contracts ------------------------------
export interface ContractInvestment {
  dateCreation: string;
  dateEnd: string;
  dateInitial: string;
  idContract: string;
  idProduct: string;
  nameProduct: string;
  performanceMoney: null | string;
  planProducto: string;
  tae: string;
  tir: null;
  totalMoney: string;
  uniqueReference: string;
  valueEnd: string;
  valueInitial: string;
  goalContract: string;
  numUnidades: string;
  variation: string;
  isManaged: boolean;
}

export interface BodyContractInvestment {
  userId: string;
  Period: number;
  numberDoc: string;
  TypeDoc: string;
  Idate: string | null;
  Fdate: string | null;
}

export interface ContractMonitor {
  dateCreation: string;
  dateEnd: string;
  dateInitial: string;
  idContract: string;
  idProduct: string;
  nameProduct: string;
  performanceMoney: null | string;
  planProducto: string;
  tae: string;
  tir: null | string;
  totalMoney: string;
  uniqueReference: string;
  valueEnd: string;
  valueInitial: string;
  goalContract: string;
  numUnidades: string;
  variation: string;
  color: string;
  arrayTIR: Array<null | string> | null;
  alert: boolean | null;
  points: Point[] | null;
  historicOrLastPerformance: string | null;
  valorization?: number | null;
  isManaged: boolean;
  id?: string;
  idporfolio?: string;
  rango?: string;
  chartKey?: string;
}

//------------------------ TIR ----------------------------------------------
export interface InfoTIR {
  idContract: string;
  idProduct: string;
  tir: Array<null | string>;
}

//------------------------- Contracts monitor points ------------------------
export interface TableInvestment {
  idContract: string;
  idProduct: string;
  points: Point[];
  performaceTables: PerformacePoint[];
  tirPercentages: TirPercentage[];
  corteContrato: string;
  cortePorcentajes: string;
}

export interface Point {
  iDate: string;
  iValue: string | undefined | null;
  iValueNorm: string;
  real: boolean | null;
  datefriendly: string;
  performance: null | string;
  totalBalance: null | string;
  dateExtract?: string;
}

export interface PerformacePoint {
  intervalo: string;
  saldo: string;
  rendimiento: string;
}

export interface TirPercentage {
  days: string;
  percentage: number;
}

//------------------------  Performance per Contracts -----------------------
export interface PerformanceContracts {
  idContract: string;
  performances: string;
}

export interface PerformanceContractsBody {
  typeTime: number;
  contracts: ContractMonitor[];
}

// ----------------- Portfolios per contracts -------------------------
// ----- Select 0 --------------
export interface PortfoliosData {
  idContract: string;
  idProduct: string;
  portafolios: Portafolio[];
}

export interface Portafolio {
  infoPortf: InfoPortf;
  points: Point[];
  infoTable: InfoTable;
}

export interface InfoPortf {
  compra: string;
  idFondo: string;
  nombreFondo: string;
  porcentFondo: string;
  saldoFondo: string;
  saldoUnFondo: string;
  valorUnidad: string;
  venta: string;
}

export interface InfoTable {
  fdate: string;
  fvalue: string;
  fvaluetotal: string;
  idate: string;
  ivalue: string;
  ivaluetotal: string;
  numunit: string;
  performance: string;
  performancevalue: string;
  portfolio: string;
  returnpond: string;
  tea: string;
  tir: string;
  variacion: string;
}

// ------------- Select 5 ----------------
export interface PortfoliosHistoricoData {
  idContract: string;
  idProduct: string;
  portafolios: PortafolioHistorico[];
}

export interface PortafolioHistorico {
  infoPortfHistoric: InfoPortfHistoric;
  points: Point[];
  infoTable: InfoTable;
}

export interface InfoPortfHistoric {
  activo: boolean;
  firstTransaction: string;
  idFondo: string;
  lastTransaction: string;
  nombreFondo: string;
  porcentFondo: null | string;
  saldoFondo: null | string;
  saldoUnFondo: null | string;
  valorUnidad: string;
  numTransaction: string;
  numUnidad: null | string;
  performance: null | string;
}

// ----------- Select 1,2,3,4,6 -------------

export interface PortfoliosDataOnTimeFrame {
  idProduct: string;
  idContract: number;
  portfoliosDetail: PortfolioOnTimeFrame[];
  warning: string;
}

export interface PortfolioOnTimeFrame {
  idPortfolio: string;
  name: string;
  compositionPercent: number;
  unitNumber: number;
  initialDate: null | string;
  initialValue: number;
  unitInitValue: number;
  finalDate: null | string;
  finalValue: number;
  unitFinalValue: number;
  variation: number;
  tea: number;
}

// ---------- Sort Portfolio tables ----------------------
export interface SortDataOnTimeFrameOptions {
  by:
    | 'idPortfolio'
    | 'name'
    | 'compositionPercent'
    | 'unitNumber'
    | 'initialDate'
    | 'initialValue'
    | 'unitInitValue'
    | 'finalDate'
    | 'finalValue'
    | 'unitFinalValue'
    | 'variation'
    | 'tea';
  type: 'String' | 'Number' | 'Date';
}
// --------------- Transaction info per contracts -------------------
export interface FundTransaction {
  datetransaction: string;
  numUnidades: string;
  tipoTransaccion: string;
  valorUnidad: string;
  idfondo: string;
  valorTransaccion: string;
  datetransactionFormatted?: string;
}

export interface FundTransactionBody {
  contract: string;
  product: string;
  fund: string;
}

// ------------------ Filter Points ---------------------------

export interface BodyPoints {
  IDate: string;
  FDate: string;
  IdFunds: string[];
}

export interface PointsFunds {
  idFund: string;
  points: Point[];
}

export interface IndicatorsPoints {
  idIndicator: string;
  points: Point[];
}

//----------------------------- Assets Comparions -------------------------------
export interface AssetsComparisons {
  currencies: ContractMonitor[];
  portfolios: ContractMonitor[];
}

export interface DetailedContracts {
  linePoints: Coordinates[];
  valor: Coordinates[];
  aportes: Coordinates[];
  retiros: Coordinates[];
  intervaloSup: Coordinates[];
  intervaloInf: Coordinates[];
}

export interface Coordinates {
  x: string;
  y: string;
}
//---------------------------------------------------------------------------------------
export interface ActiveInactiveContract {
  isInsurance: boolean;
  productCode: string;
  productName: string;
  planCode: string;
  goalText: string;
  number: string;
  reference: string;
  balanceLabel: string;
  balance: number;
  isInvested: boolean;
  estado: string;
  agentName: string;
  agentRelation: string;
  colorTag: string;
  tipoProducto:
    | 'CollectiveInvestment'
    | 'LongTermSavings'
    | 'Insurance'
    | 'Brokerage'
    | 'PensionInvestment'
    | 'Investment';
  tipoProductoFormatted?: string;
}

export interface ContractPie {
  result: Result;
  id: number;
  exception: any;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState: any;
  isFaulted: boolean;
}

export interface Result {
  pie: ContractPieChildren;
  isClient: boolean;
}

export interface ContractPieChildren {
  name: string;
  value: number;
  contractLongName: string;
  children: ContractPieChildren[];
  reference?: string;
  itemStyle?: {
    color: string;
  };
}

export interface ContractDetail {
  isObligatory: boolean;
  productCode: string;
  planCode: string;
  number: string;
  reference: string;
  performance: string;
  averageContribution: string;
  withdrawals: string;
  contingentAccount: string;
  initialDate: string;
  portfolioSummary: PortfolioSummary[];
}

export interface PortfolioSummary {
  percentage: string;
  name: string;
  productName: string;
  pdfFundName: string;
  balance: string;
  performance: string;
  averagePerformance: string;
  tea: string;
  unitNumber: string;
  unitValue: string;
  performancePercentage: string;
  firstTransactionDate: string;
  numTransactions: string;
  capitalPlusVal: string;
  id: string;
  oblInitialDate: string;
  oblFinalDate: string;
  oblInitialUnitVal: string;
  oblInitialBalance: string;
  variation: string;
}

export interface BodyURLPipelineContract {
  IdAgent: number;
  NumberDocAgent: string;
  AgentEmail: string;
  DocNumberClient: string;
  DocTypeClient: string;
  IdContract: string;
  IdProduct: string;
  IdPlanProduct: string;
}

export interface CompositionContracts {
  idFund: string;
  nameFund: string;
  valueUnid: string;
  datevu: string;
  performance: string;
  totalValue: string;
  procentage: number;
  product: string;
  productName: string;
  productType: string;
  name?: string;
}

export interface ProductTypesFilter {
  type: string;
  name: string;
  checked: boolean;
  colorOn: string;
  colorOff: string;
  filterOn: string;
  filterOff: string;
}

export interface BodyPortfolioGraph {
  fechaInicio: string;
  fechaFin: string;
  rango: string;
  contracts: {
    contrato: number;
    producto: string;
  }[];
}

export interface PortfolioGraph {
  idPortafolio: string;
  nombrePortafolio: string;
  contrato: number;
  producto: string;
  porfolioPoints: PorfolioPointGraph[];
}

export interface PorfolioPointGraph {
  fecha: string;
  valorUnidad: number;
  saldo: number;
  rendimiento: number;
}

export interface DateRange {
  minDate: string;
  maxDate: string;
}

export interface tirMonitor {
  idcontract: string;
  idporfolio: string;
  tir: string;
}
