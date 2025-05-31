module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@api': './src/api',
          '@constants': './src/constants',
          '@provider': './src/provider',
          '@hooks': './src/hooks',
          '@stores': './src/stores',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@types': './src/types',
          '@navigation': './src/navigations',
          '@components': './src/components',
          '@pages': './src/components/pages',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
