import {Platform} from 'react-native';

export const IsIos = Platform.OS === 'ios';
export const IsAndroid = Platform.OS === 'android';
export const IsAndroidTenDown = Platform.OS === 'android' && Platform.Version < 30;
