import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface ISystemBarHeight {
  topBar: number;
  bottomBar: number;
  screenHeight: number;
}

export interface IFoldDevice {
  isFold: boolean;
}

export interface IFoldInfo {
  stateFold: number;
}

export interface Spec extends TurboModule {
  getSystemBarHeight(callback: ({topBar, bottomBar, screenHeight}: ISystemBarHeight) => void): void;
  isFoldDevice(callback: ({isFold}: IFoldDevice) => void): void;
  getInfoFoldableScreen(callback: ({stateFold}: IFoldInfo) => void): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeGlobalUtils');
