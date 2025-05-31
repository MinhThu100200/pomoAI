import React, {useCallback, useMemo, useRef, useState} from 'react';

import {PortalProvider} from '@gorhom/portal';
import {useTheme} from '@hooks/useTheme';
import RootNavigation, {DirectParamListBase} from '@navigation/rootNavigation';
import {RoutesNavigation} from '@navigation/routesNavigation';
import GlobalStyleProvider from '@provider/GlobalStyleProvider';
import InitializationProvider from '@provider/InitializationProvider';
import ReactQueryProvider from '@provider/ReactQueryProvider';
import {createNavigationContainerRef, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';

export const navigationRef = createNavigationContainerRef<DirectParamListBase>();

function App(): React.JSX.Element {
  const {theme} = useTheme();
  const statusBarColor = useMemo(() => theme['background/bgSecondary'], [theme]);
  const [isReadyNavigation, setIsReadyNavigation] = useState(false);
  const [currentRouteName, setCurrentRouteName] = useState<RoutesNavigation>();

  const routeNameRef = useRef<string>();

  const containStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: 'red',
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
  const onReady = useCallback(() => {
    setIsReadyNavigation(true);
    setCurrentRouteName(navigationRef.getCurrentRoute()?.name as RoutesNavigation);
    routeNameRef.current = navigationRef.getCurrentRoute()?.name!;
    console.log('routeNameRef.current', routeNameRef.current);
  }, []);

  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef?.getCurrentRoute()?.name as RoutesNavigation | undefined;
    // const currentRouteParams = navigationRef?.getCurrentRoute()?.params as any;

    if (previousRouteName === currentRouteName) return;
    if (!currentRouteName) return;

    setCurrentRouteName(currentRouteName);
    routeNameRef.current = currentRouteName;
    // console.log('routeNameRef.current', routeNameRef.current);
  }, []);
  return (
    <GestureHandlerRootView style={containStyle}>
      <PortalProvider>
        <ReactQueryProvider>
          <InitializationProvider>
            <SafeAreaProvider>
              <GlobalStyleProvider>
                <NavigationContainer
                  ref={navigationRef}
                  theme={NavigationTheme}
                  onReady={onReady}
                  onStateChange={onStateChange}>
                  <RootNavigation />
                </NavigationContainer>
              </GlobalStyleProvider>
            </SafeAreaProvider>
          </InitializationProvider>
        </ReactQueryProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
