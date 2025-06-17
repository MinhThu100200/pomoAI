declare module 'react-native-config' {
  interface Config {
    API_BASE_URL: string;
    APP_TYPE: 'dev' | 'release';
    GOOGLE_CLIENT_ID: string;
  }

  const Config: Config;
  export default Config;
}
