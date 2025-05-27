import React, {useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PortalHost, PortalProvider} from '@gorhom/portal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReactQueryProvider from '@provider/ReactQueryProvider';
import InitializationProvider from '@provider/InitializationProvider';
import {DefaultTheme} from '@react-navigation/native';
import {useTheme} from '@hooks/useTheme';

function App(): React.JSX.Element {
  const {theme} = useTheme();
  const statusBarColor = useMemo(() => theme['background/bgSecondary'], [theme]);

  const containStyle = useMemo(
    () => ({
      flex: 1,
      // paddingTop: isAndroidHorizontalModeOldVersion
      //   ? 0
      //   : systemBarHeight.topBar,
      // paddingBottom: isAndroidHorizontalModeOldVersion
      //   ? 0
      //   : systemBarHeight.bottomBar,
    }),
    [],
    // [isAndroidHorizontalModeOldVersion, systemBarHeight],
  );

  const NavigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme['background/bgSecondary'],
      },
    }),
    [theme],
  );

  return (
    <GestureHandlerRootView style={containStyle}>
      <PortalProvider>
        <ReactQueryProvider>
          <InitializationProvider>
            <SafeAreaProvider>
              
            </SafeAreaProvider>
          </InitializationProvider>
        </ReactQueryProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
