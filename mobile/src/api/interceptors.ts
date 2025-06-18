import {clearAllTokens, getAccessToken, getRefreshToken} from '@utils/tokenManager';
import {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

let refreshTokenPromise: Promise<any> | null = null;

export const logOut = () => {
  try {
    //clear zustand

    clearAllTokens();
  } catch (error) {
    console.log('error logout !!!!!!!', error);
  }
};

export const refreshToken = async (config: InternalAxiosRequestConfig) => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          // const data = await Auth.RefreshTokenApi(refreshToken);
          // // console.log('Refresh Token !!!!!!!!!!!!!!!!!', data.accessToken, config.url);
          // if (data) {
          //   setAccessToken(data.accessToken);
          //   setRefreshToken(data.refreshToken);
          //   config.headers.Authorization = `Bearer ${data.accessToken}`;
          //   //토큰 만료로 인한 실패한 호출 Retry
          //   instance.request(config);
          // }
        }
        resolve(true);
      } catch (error: any) {
        if (error?.statusCode === 401) {
          logOut();
        }
        reject(error);
      } finally {
        refreshTokenPromise = null;
      }
    });
  }
};
export const authRequestError = async (error: any) => {
  return Promise.reject(error);
};

export const authRequest = async (config: InternalAxiosRequestConfig) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const authResponse = async (response: AxiosResponse) => {
  return response;
};

export const authResponseError = async (error: any) => {
  if (error?.response?.status === 401) {
    await refreshToken(error?.config);
  }
  return Promise.reject(error);
};
