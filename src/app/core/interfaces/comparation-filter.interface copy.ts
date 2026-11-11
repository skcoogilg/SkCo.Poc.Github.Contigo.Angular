export interface Funds {
  clasification: string;
  description:   string;
  idFund:        string;
  region:        null | string;
}

export interface Indicators {
  id:   string;
  name: string;
  type?: Type;
}

export enum Type {
  divisa = "divisa",
  indicador = "indicador",
}
