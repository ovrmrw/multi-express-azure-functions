export interface AFResponse {
  status?: number;
  body?: any;
}


export interface AFContext {
  res: AFResponse;
  done: () => void;
  log: (...params: any[]) => void;
}


export interface AFRequest {
  body: any;
  query: any;
}


export interface AzureFunction {
  (context: AFContext, req: AFRequest): void;
}


export interface NestedAzureFunction {
  (callback: AzureFunction): AzureFunction;
}
