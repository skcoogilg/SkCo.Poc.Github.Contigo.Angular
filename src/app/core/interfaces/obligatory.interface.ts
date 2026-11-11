export interface ObligatoryAssetAllocation {
  fund: string;
  fundName: string;
  productName?: string;
  pdfFundName?: string;
  balance: number;
  percentage: number;
  unitBalance: number;
  unitValue: number;
  colorTag?: string;
}

export interface ObligatoryDetailsEmployers {
  nit: number;
  endDate: string;
  name: string;
  startDate: string;
}

export interface ObligatoryStandingAllocation {
  date: string;
  fund: string;
  fundName: string;
  percentage: number;
  productName?: string;
  pdfFundName?: string;
  colorTag?: string;
}

export interface ObligatoryDetails {
  assetAllocation: ObligatoryAssetAllocation[];
  dueBalance: number;
  employers: ObligatoryDetailsEmployers[];
  mandatoryBalance: number;
  mandatoryReturn: number;
  originEntity: string;
  returns: number;
  standingAllocation: ObligatoryStandingAllocation[];
  upcSalary: number;
  voluntaryBalance: number;
  voluntaryBalanceEmployer: number;
  voluntaryBalanceOwn: number;
  voluntaryReturn: number;
  agentId: number;
  balance: number;
  balanceDate: string; // ISO date string
  docNumber: string;
  docType: string;
  effectiveDate: string; // ISO date string
  goalId: number;
  goalText: string | null;
  insuredAmount: number | null;
  isManaged: boolean;
  name: string;
  number: number;
  planCode: string;
  productCode: string;
  reference: string;
  startDate: string; // ISO date string
  statusCode: string;
  statusName: string;
}

export interface ObligatoryMovement {
  valorBruto: string;
  valorBrutoNumber: number;
  tipoTransaccion: string;
  tipoDeTransaccion: string;
  fechaEfectiva: string;
  valorNeto: string;
  valorNetoNumber: number;
  descripcion: string;
  empresa: string;
  valorBrutoFormatProducto: string;
  codTransaccion: string;
  nroEvento: string;
  nroTransaccion: string;
  fechaEfectivaStr: string;
  fechaProcesoStr: string;
}

export interface ObligatoryPensionBonus {
  fechaCorte: string;
  fechaEmision: string;
  fechaRedencionNormal: string;
  tasaNominal: number;
  cupones: ObligatoryPensionBonusCupon[];
  bono: {
    numeroDocumento: string;
    tipoDocumento: string;
    salida: string;
    estado: string;
    mensaje: string;
  };
}

export interface ObligatoryPensionBonusCupon {
  numeroDocumento: string;
  tipoDocumento: string;
  nombreEmisor: string;
  estadoCuotaParte: string;
  valorCorte: string;
  valorEmision: string;
  valorCapitalizacion: string;
}

export interface ObligatoryWorkHistoryValidaBono {
  entidadResponsable: string;
  fechaIngreso: string;
  fechaRetiro: string;
  fuenteInformacion: string;
  diasAcumulados: number;
  salarioBaseCotizacion: number;
  nitPatronal: number;
  diasAportados: number;
  diasContabilizados: number;
  empleador: string;
  periodo: string;
  entidadDestino: string;
}

export interface ObligatoryWorkHistoryInvalidoBono {
  periodo: string;
  empleador: string;
  fechaIngreso: string;
  fechaRetiro: string;
  entidadDestino: string;
  fuente: string;
  salarioBase: number;
  nitPatronal: number;
  diasAportados: number;
  diasContabilizados: number;
  diasNoValidos: number;
}

export interface ObligatoryWorkHistoryAhorroIndividual {
  empleador: string;
  periodo: string;
  entidadResponsable: string;
  entidadDestino: string;
  diasAcumulados: number;
  salarioBase: number;
  documentoEmpleador: number;
  diasCotizados: number;
  diasContados: number;
  valorCotizacion: number;
}

export interface ObligatoryWorkHistory {
  hlValidaBono: ObligatoryWorkHistoryValidaBono[];
  hlInvalidoBono: ObligatoryWorkHistoryInvalidoBono[];
  hlraIcS: ObligatoryWorkHistoryAhorroIndividual[];
  resumenConsolidado: {
    totalPrevioAVigencia: number;
    totalInvalido: number;
    totalValido: number;
    totalDiasRA: number;
    totalCotizadoSistema: number;
  };
}

export interface ObligatoryWorkHistoryMapped {
  type: 'INDIVIDUAL' | 'VALIDO' | 'INVALIDO';
  typeFormatted:
    | 'Ahorro individual'
    | 'Prima media - Bono'
    | 'Prima media - No Bono';
  entidadResponsable?: string;
  fechaIngreso?: string;
  fechaRetiro?: string;
  fuenteInformacion?: string;
  diasAcumulados?: number;
  salarioBaseCotizacion?: number;
  nitPatronal?: number;
  diasAportados?: number;
  diasContabilizados?: number;
  empleador?: string;
  periodo?: string;
  entidadDestino?: string;
  fuente?: string;
  diasNoValidos?: number;
  salarioBase?: number;
  documentoEmpleador?: number;
  diasCotizados?: number;
  diasContados?: number;
  valorCotizacion?: number;
}

export interface ObligatoryTransfer {
  tipoDocum: string;
  tipoTraslado: string;
  tipoEntidad: string;
  razonSocial: string;
  statusTraslado: string;
  descripcion: string;
  estadoprobacion: string;
  fechaEmisionDoc: string;
  fechaRespueta: string;
  fechaPago: string;
  fechaMovimiento: string;
  valorTotal: number;
  nroDocum: number;
  codEntidad: number;
}

export interface MovimientoDetalle {
  detalleTransaccion: DetalleTransaccion[];
  detallePortafolios: DetallePortafolio[];
}

export interface DetalleTransaccion {
  nombreProducto: string;
  contrato: string;
  descripcion: string;
  fechaEfectiva: string;
  valorTransaccion: string;
}

export interface DetallePortafolio {
  producto: string;
  contrato: string;
  planProducto: string;
  evento: number;
  transaccion: number;
  fechaEfectiva: string;
  fechaProceso: string;
  valorNeto: number;
  nombreLargo: string;
  descripcion: string;
  numUnidades: number;
  idFondo: string;
  valorUnidad: number;
  valorTransaccion: number;
  valorTransaccionStr: string;
  porcentaje: number;
}
