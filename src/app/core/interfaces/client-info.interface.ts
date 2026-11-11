export interface Client {
  names:       string;
  relation:    string;
  doc:         string;
  docType:     string;
  AcademicLevel: string | null;
  AdressInfo:    AdressInfo | null;
  CellPhone:     string | null;
  CivilStatus:   string | null;
  CreatedDate:   Date | null;
  DateExpeditionDoc: string | null;
  birthDate:         string | null;
  PhonesInfo:    PhonesInfo | null;
  Profession:    string | null;
  RiskProfile:   string | null;
  Segment:       string;
  Sex:           string | null;
  Enterprise:    null | string;
  Marcacion:     string | null;
  Email:         string | null;
}

export interface AdressInfo {
  JobAdress:   string;
  LocalAdress: string;
}

export interface PhonesInfo {
  JobPhone:         string | null;
  ResidencialPhone: string;
}
