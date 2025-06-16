declare module 'react-native-config' {
  interface Config {
    API_BASE_URL: string;
    APP_TYPE: 'dev' | 'release';
  }

  const Config: Config;
  export default Config;
}
