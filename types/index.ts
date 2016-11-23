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
  originalUrl: string;
  method: string;
  headers: AFHeaders;
  body: any;
  query: any;
  params: any;
}


export interface AFHeaders {
  host: string;
  // 'x-original-url': string;
}


export interface AzureFunction {
  (context: AFContext, req: AFRequest): void;
}


export interface NestedAzureFunction {
  (callback: AzureFunction): AzureFunction;
}
