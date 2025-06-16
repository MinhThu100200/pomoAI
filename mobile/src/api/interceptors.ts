import {InternalAxiosRequestConfig} from 'axios';

let refreshTokenPromise: Promise<any> | null = null;

const logOut = () => {
  try {
    //clear zustand
  } catch (error) {
    console.log('error logout !!!!!!!', error);
  }
};

const refreshToken = (config: InternalAxiosRequestConfig) => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = new Promise(async (resolve, reject) => {
        try {
        //   const refreshToken = await getRefreshToken();
      } catch (error: any) {
      } finally {
      }
    });
  }
};
