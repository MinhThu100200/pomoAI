const path = require('path');

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
// can use svg like a component => e.g export { default as IcoHome } from './ico-home.svg';

const config = {
  watchFolders: [
    path.resolve(__dirname),
    path.resolve(__dirname, '../node_modules'), // ✅ để resolve đúng
  ],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: new Proxy(
      {},
      {
        get: (_, name) => path.resolve(__dirname, '../node_modules', name),
      },
    ),
  },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, config));
