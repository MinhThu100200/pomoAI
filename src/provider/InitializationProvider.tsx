import {View, Text, TextInput, BackHandler} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import useBackgroundServiceRefresh from '@hooks/useBackgroundServiceRefresh';
import { IsAndroid } from '@constants';

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

    // use custom hook to setUp firebase, storage


    // handle cache when app resumes
    useBackgroundServiceRefresh()

    // handle back => android
    useEffect(() => {
        if (IsAndroid) {
            const backAction = () => {
                BackHandler.exitApp()
                return true;
            }
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
            return () => backHandler.remove();
        }
    }, [])

  return <>{children}</>;
};

export default InitializationProvider;
