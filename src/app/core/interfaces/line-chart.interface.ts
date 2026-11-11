export interface DataChart {
  finalData: FinalData[];
  dataToolTip: DataToolTip[];
  dateFriendly: string[];
  minValue: number;
  maxValue: number;
}

export interface DataToolTip {
  iValue: string[];
  performance: string[] | undefined;
  totalBalance: string[] | undefined;
}

export interface FinalData {
  name: string;
  yAxisDataNorm: string[];
  yAxisRealData: (string | null | undefined)[];
  color: string | undefined;
  performance: (string | null)[] | null;
  totalBalance: (string | null)[] | null;
  nameProduct?: string;
}
