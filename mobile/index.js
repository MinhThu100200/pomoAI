/**
 * @format
 */
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
import { Buffer } from 'buffer';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

global.Buffer = Buffer; //use react native svg android "Unable to resolve module buffer"

AppRegistry.registerComponent(appName, () => App);
