export interface DetailClient {
  AcademicLevel: string | null;
  AdressInfo: AdressInfo | null;
  CellPhone: string | null;
  CivilStatus: string | null;
  CreatedDate: Date;
  Docs: Docs;
  Email: string | null;
  Enterprise: null | string;
  Lastname: string;
  Marcacion: string | null;
  Name: string;
  PhonesInfo: PhonesInfo | null;
  Profession: string | null;
  Relation: string;
  RiskProfile: string | null;
  Segment: string;
  Sex: string | null;
  icon: string;
  names: string;
  relation: string;
  doc: string;
  docType: string;
  DateExpeditionDoc: string;
  birthDate: string;
}

export interface AdressInfo {
  JobAdress: string;
  LocalAdress: string;
}

export interface Docs {
  DateExpeditionDoc: string | null;
  Ndoc: string;
  birthDate: string | null;
  typDoc: string;
}

export interface PhonesInfo {
  JobPhone: string | null;
  ResidencialPhone: string;
}

export interface PersonId {
  personId: string;
}

export interface BodyDetailClient {
  IdAgent: string;
  PersonId: string;
}

export interface PensionInfo {
  DatosCliente: DatosCliente;
  CarteraPresunta: CarteraPresunta[];
}

export interface DatosCliente {
  PERS_ID: number;
  Contrato: number;
  PeriodoCorte: number;
  NroDocum: number;
  TipoDocum: string;
  IdAgte: number;
  IdSociedad: number;
  Salario: number;
  Saldo: number;
  FechaPrimerAporte: string;
  Edad: number;
  Genero: string;
  Semanas: string;
  SemanasProyectadas100: number;
  SemanasProyectadas75: number;
  SemanasRAI: string;
  SemanasRPM: string;
  Tiene_Fidu: number;
  Tiene_MFUND: number;
  Tiene_Seguros: number;
  Tiene_SIPEN: number;
  SegmentoReforma: string;
  PrioridadReforma: string | null;
  PrioridadReformaGrupo: string;
  Persistencia: number;
  DevSaldoOPensionAnt: string;
  DevSaldoOPensionAnt2: string;
  CarteraPresunta: string;
  CantMesesCarteraPresunta: string;
  ProcesosJudiciales: string;
  PeriodoCorteDate: string;
  CarteraPresuntaValue: number;
}

export interface CarteraPresunta {
  TipoAportante: string;
  NombreEmpresa: string;
  YYYYMM: number;
  YYYY: number;
  MM: number;
  IBC: number;
  CotizacionObligatoria: number;
  FSP: number;
  AporteVoluntarioAfiliado: number;
  AporteVoluntarioEmpresa: number;
  Total: number;
}
