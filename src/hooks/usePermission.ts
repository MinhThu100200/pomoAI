import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { checkMultiple, Permission, PERMISSIONS, PermissionStatus, requestMultiple } from 'react-native-permissions';

type PermissionResults = Record<Permission, PermissionStatus>;


const permissionGranted = (status: PermissionResults, limitedCallback?: () => void) => {
  return Object.values(status).every(result => {
    if (result === 'granted') {
      return true;
    }
    if (result === 'limited') {
      limitedCallback?.();
      return true;
    }
    return false;
  });
};

export const INIT_CALL_PERMISSIONS: Permission[] = Platform.select({
  android: [PERMISSIONS.ANDROID.POST_NOTIFICATIONS, PERMISSIONS.ANDROID.READ_PHONE_STATE],
  ios: [PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY],
  default: [],
});

export const usePermissions = (perms: Permission[]) => {
  const [state, setState] = useState<'pending' | 'granted' | 'rejected'>('pending');
  useEffect(() => {
    const checkAndRequest = async () => {
      const resultCheckPermissions = await checkMultiple(perms);
      const isAllGranted = permissionGranted(resultCheckPermissions);
      if (isAllGranted) {
        return setState('granted');
      }
      const resultRequestPermissions = await requestMultiple(perms);
      const isGranted = permissionGranted(resultRequestPermissions);
      setState(isGranted ? 'granted' : 'rejected');
    };
    checkAndRequest();
  }, [perms]);
};
