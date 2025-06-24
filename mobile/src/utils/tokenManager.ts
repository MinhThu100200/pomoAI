import * as Keychain from 'react-native-keychain';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * ACCESS TOKEN (dùng MMKV - nhanh, không cực kỳ nhạy cảm)
 */
export const saveAccessToken = (token: string) => {
  mmkv.set(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return mmkv.getString(ACCESS_TOKEN_KEY);
};

export const deleteAccessToken = () => {
  mmkv.delete(ACCESS_TOKEN_KEY);
};

/**
 * REFRESH TOKEN (dùng Keychain - bảo mật cao)
 */
export const saveRefreshToken = async (token: string) => {
  await Keychain.setGenericPassword('refresh', token, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    service: REFRESH_TOKEN_KEY,
  });
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({service: REFRESH_TOKEN_KEY});
  return credentials ? credentials.password : null;
};

export const deleteRefreshToken = async () => {
  await Keychain.resetGenericPassword({service: REFRESH_TOKEN_KEY});
};

/**
 * Xoá tất cả tokens khi logout
 */
export const clearAllTokens = async () => {
  deleteAccessToken();
  await deleteRefreshToken();
};
