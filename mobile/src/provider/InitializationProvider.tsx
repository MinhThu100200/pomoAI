import {View, Text, TextInput, BackHandler} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import useBackgroundServiceRefresh from '@hooks/useBackgroundServiceRefresh';
import { IsAndroid } from '@constants';
import {useConfigNotification} from '@hooks/useConfigNotification';
import {INIT_CALL_PERMISSIONS, usePermissions} from '@hooks/usePermission';

const InitializationProvider = ({children}: PropsWithChildren) => {
  // prevent font scaling based on system settings
  interface TextWithDefaultProps extends Text {
    defaultProps?: {allowFontScaling?: boolean};
  }
  (Text as unknown as TextWithDefaultProps).defaultProps = (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

  (TextInput as unknown as TextWithDefaultProps).defaultProps =
    (TextInput as unknown as TextWithDefaultProps).defaultProps || {};
  (TextInput as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

  // use custom hook to setUp firebase, translation
  useConfigNotification();

  // handle cache when app resumes
  useBackgroundServiceRefresh();

  // check permission
  usePermissions(INIT_CALL_PERMISSIONS);

  // handle back => android
  useEffect(() => {
    if (IsAndroid) {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, []);

  return <>{children}</>;
};

export default InitializationProvider;
