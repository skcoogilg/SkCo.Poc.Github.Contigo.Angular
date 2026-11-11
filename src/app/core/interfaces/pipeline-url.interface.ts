export interface PipelineUrl {
  url: string;
}

export interface BodyPipelineUrl {
  IdAgent: number;
  DocumentAgent: string;
  DocumentNum: number;
  TypeDocument: string;
  AgentIdPipeline: string;
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
