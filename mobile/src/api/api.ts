import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import QueryString from 'qs';
import {authRequest, authRequestError, authResponse, authResponseError} from './interceptors';

export const instance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    // lang: localeInfo.getLanguage(),
    // 'region-code': localeInfo.getRegion(),
  },
  paramsSerializer: params => {
    return QueryString.stringify(params);
  },
  withCredentials: false,
});

instance.interceptors.request.use(authRequest, authRequestError);
instance.interceptors.response.use(authResponse, authResponseError);

const onError = (error: AxiosError<unknown, any>) => {
  const {response} = error as AxiosError;
  if (response) {
    return Promise.reject(response.data);
  }
  return Promise.reject(error);
};

export const Api = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config).catch(onError),
  post: (url: string, body?: any, config?: AxiosRequestConfig) =>
    instance.post(url, {...body}, {...config}).catch(onError),
  patch: (url: string, body: any, config?: AxiosRequestConfig) =>
    instance.patch(url, {...config, ...body}).catch(onError),
  put: (url: string, body: any, config?: AxiosRequestConfig) => instance.put(url, {...config, ...body}).catch(onError),
  delete: (url: string, body?: any, config?: AxiosRequestConfig) =>
    instance.delete(url, {...config, data: body}).catch(onError),
};

export const setInstanceHeader = ({
  regionCode,
  lang,
  userAgent,
  clientId,
}: {
  regionCode: string;
  lang: string;
  userAgent: string;
  clientId?: string;
}) => {
  instance.defaults.headers['region-code'] = regionCode;
  instance.defaults.headers.lang = lang;
  instance.defaults.headers['User-Agent'] = userAgent;
  if (clientId) instance.defaults.headers['client-id'] = clientId;
};

/**
 * axios custom instance for orval
 * **/
// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = instance({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then(({data}) => data)
    .catch(onError);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
