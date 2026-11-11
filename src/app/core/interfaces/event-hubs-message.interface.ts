export interface EventHubMessage {
  id:              string;
  eventName:       string;
  eventCategory:   string;
  eventDatetime:   string;
  ip:              string;
  url:             string;
  deviceId:        string;
  sessionId:       string;
  browserName:     string;
  isMobile:        boolean;
  operatingSystem: string;
  channel:         string;
  userData:        UserData;
  txData:          TxData;
}

export interface TxData {
  operation:        string;
  operationTime:    string;
  operationResult:  string;
  txComplementData?: ComplementDatum[];
}

export interface ComplementDatum {
  key:   string;
  value: string;
}

export interface UserData {
  skUserId?:           string;
  userName?:           string;
  userDocNumber:      string;
  userDocType:        string;
  userMail:           string;
  gUserType?:          string;
  gUserId?:            string;
  userComplementData?: ComplementDatum[];
}

export interface VariablesMessage {
  contractNum?: string;
  clientDoc: string;
  user: string;
  userDoc: string;
  userDocType: string;
  agentTypeDescription: string;
  eventCategory: string;
  eventName: string;
  operation: string;
  operationResult: string;
  txComplementData: ComplementDatum[];
}
