import axios from 'axios';
import Config from 'react-native-config';
import QueryString from 'qs';

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


