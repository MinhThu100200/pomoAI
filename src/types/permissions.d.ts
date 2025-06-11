import 'react-native-permissions';

declare module 'react-native-permissions' {
  namespace PERMISSIONS {
    const ANDROID: typeof import('react-native-permissions').PERMISSIONS.ANDROID & {
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS';
    };

    const IOS: typeof import('react-native-permissions').PERMISSIONS.IOS;
  }
}
