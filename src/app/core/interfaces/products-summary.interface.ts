export interface ProductsSummary {
  obligatoryData: ObligatoryData;
  investmentData: InvestmentData;
  insuranceData: InsuranceData;
  totalManaged: number;
}

export interface InsuranceData {
  balance: number;
  monthlyPrice: number;
  sumInsured: number;
  percentage: number;
  colorTag: string;
}

export interface InvestmentData {
  balance: number;
  return: number;
  returnRate: number;
  percentage: number;
  colorTag: string;
}

export interface ObligatoryData {
  balance: number;
  ibc: number;
  percentage: number;
  colorTag: string;
}

export interface BodyProductsSummary {
  IdAgent: number;
  DocNumClient: string;
  DocTypeClient: string;
}

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

export interface ContractDetail {
  isObligatory: boolean;
  productCode: string;
  planCode: string;
  capital: string;
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
  colorTag?: string;
}
