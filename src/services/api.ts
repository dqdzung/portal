/* eslint-disable class-methods-use-this */
import { CONFIG } from '@/config';
import i18n from '@/locales/i18n';
import { DateTime, ModelTypes } from '@/models';
import { LoginUser } from '@/pages/Login';
import { encrypt } from '@/utils/auth';

import {
  ApiConfig,
  BaseResponse,
  CancelToken,
  ContentType,
  DeleteParams,
  FilterParams,
  FullRequestParams,
  HttpResponse,
  ModelResponse,
  PostParams,
  PutParams,
  QueryParamsType,
  RequestParams,
  SingleModelResponse
} from './type';

class HttpClient<SecurityDataType = unknown> {
  public baseUrl = '/api';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private securityErrorHandler?: ApiConfig<SecurityDataType>['securityErrorHandler'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);
  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    format: 'json'
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData(data: SecurityDataType | null) {
    this.securityData = data;
  }
  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`;
  }
  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }
  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value: any[] = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join('&');
  }
  public toQueryString(rawQuery?: QueryParamsType) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => typeof query[key] !== 'undefined'
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }
  protected addQueryParams(rawQuery?: QueryParamsType) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }
  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.JSON]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FORM_DATA]: (input: any) => {
      if (input instanceof FormData) return input;
      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData());
    },
    [ContentType.URL_ENCODED]: (input: any) => this.toQueryString(input)
  };
  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }
  private createAbortSignal(cancelToken: CancelToken) {
    if (this.abortControllers.has(cancelToken)) {
      return this.abortControllers.get(cancelToken)?.signal;
    }
    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  }
  public abortRequest(cancelToken: CancelToken) {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  }
  public async request<T = any, E = any>({
    baseUrl,
    body,
    cancelToken,
    format,
    path,
    query,
    secure,
    type,
    signal,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.JSON];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FORM_DATA
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {})
        },
        signal:
          signal ||
          (cancelToken ? this.createAbortSignal(cancelToken) : undefined),
        body:
          body === undefined || body === null ? null : payloadFormatter(body)
      }
    )
      .then(async (response) => {
        const r = response as HttpResponse<T, E>;
        r.data = null as unknown as T;
        r.error = null as unknown as E;

        const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((payload) => {
                if (r.ok) {
                  r.data = payload;
                } else {
                  r.error = payload;
                }
                return r;
              })
              .catch((error) => {
                r.error = error;
                return r;
              });

        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }

        if (!response.ok) {
          if (response.status === 401) {
            this.securityErrorHandler?.();
          }
          throw new Error(`${response.status} at ${response.url}`);
        }

        return data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

const DEFAULT_FILTER_PARAMS: Omit<FilterParams, 'modelType'> = {
  filter: {},
  isExactSearch: false,
  isUnscoped: false,
  joinColumn: [],
  page: 1,
  pageSize: 20,
  search: ''
};

export class Api<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  base = {
    filter: <T = unknown, E = any>(
      payload: FilterParams,
      params: RequestParams = {}
    ) => {
      return this.request<ModelResponse<T>, E>({
        path: '/filters/filter',
        method: 'POST',
        type: ContentType.JSON,
        body: {
          ...DEFAULT_FILTER_PARAMS,
          ...payload,
          filter: JSON.stringify(payload.filter)
        },
        ...params
      });
    },
    create: <T extends { id: number }>(
      payload: PostParams<T>,
      params: RequestParams = {}
    ) => {
      return this.request<SingleModelResponse<T>>({
        path: `/basicQueries/basicQuery${'token' in payload ? '/auth' : ''}`,
        method: 'POST',
        type: ContentType.JSON,
        body: payload,
        ...params
      });
    },
    update: <T extends { id: number }>(
      payload: PutParams<T>,
      params: RequestParams = {}
    ) => {
      return this.request<SingleModelResponse<T>>({
        path: '/basicQueries/basicQuery',
        method: 'PUT',
        type: ContentType.JSON,
        body: payload,
        ...params
      });
    },
    delete: ({ id, modelType }: DeleteParams, params: RequestParams = {}) => {
      return this.request<BaseResponse>({
        path: '/basicQueries/basicQuery/delete',
        method: 'PUT',
        type: ContentType.JSON,
        body: { id },
        query: { modelType },
        ...params
      });
    }
  };

  access = {
    login: (payload: LoginUser, params: RequestParams = {}) => {
      return this.request<SingleModelResponse<string>>({
        path: '/login/ldap',
        method: 'POST',
        type: ContentType.JSON,
        body: {
          ...payload,
          password: encrypt(payload.password)
        },
        ...params
      });
    },
    refresh: (token: string) => {
      return this.request<SingleModelResponse<string>>({
        path: '/token/refresh',
        method: 'POST',
        type: ContentType.JSON,
        body: {
          refresh_token: token
        }
      });
    },
    logout: () => {
      return this.request<SingleModelResponse<string>>({
        path: '/logout',
        method: 'POST',
        type: ContentType.JSON
      });
    }
  };
}
