export interface MonitorSami {
  nameClient: string;
  idContract: string;
  idProduct: string;
  idate: string;
  fdate: string;
  portafolios: MonitorSamiPortFolio[];
}

export interface MonitorSamiPortFolio {
  idFondo: string;
  nombreFondo: string;
  porcentFondo: string;
  numunit: string;
  unitInitValue: string;
  unitFinalValue: string;
  variacion: string;
  ivaluetotal: string;
  fvaluetotal: string;
  tea: string;
  tri: string;
  returnpond: string;
}
