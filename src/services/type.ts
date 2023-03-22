import {
  ArrayOperator,
  BooleanOperator,
  DateTimeOperator,
  ModelTypes,
  NumberOperator,
  StringOperator
} from '@/models';
import { AtLeast } from '@/utils/type';

export enum ContentType {
  JSON = 'application/json; charset=UTF-8',
  FORM_DATA = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'
}
export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;
export type CancelToken = symbol | string | number;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  path: string;
  secure?: boolean;
  type?: ContentType;
  query?: QueryParamsType;
  format?: ResponseFormat;
  body?: unknown;
  baseUrl?: string;
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface FilterParams {
  filter?: any;
  isExactSearch?: boolean;
  isUnscoped?: boolean;
  joinColumn?: string[];
  modelType: ModelTypes;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface PostParams<T extends { id: number }> {
  data: Partial<Omit<T, 'id'>> | Array<Partial<Omit<T, 'id'>>>;
  modelType: ModelTypes;
  token?: string;
}
export interface PutParams<T extends { id: number }> {
  data: AtLeast<T, 'id'>;
  modelType: ModelTypes;
}
export interface DeleteParams {
  id: number[];
  modelType: ModelTypes;
}

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  securityErrorHandler?: () => void;
}

export interface HttpResponse<D, E = any> extends Response {
  data: D;
  error: E;
}

export interface MetaData {
  page: number;
  pageSize: number;
  total: number;
}

export interface BaseResponse {
  success: boolean;
  message: string;
  errCode: string;
}
export interface ModelResponse<T> extends BaseResponse {
  data: T[];
  metaData: MetaData;
}

export interface SingleModelResponse<T> extends BaseResponse {
  data: T;
}

export interface Callback<D = any, E = any> {
  onSuccess?: (data?: D) => void;
  onError?: (error?: E) => void;
  onFinally?: () => void;
}
