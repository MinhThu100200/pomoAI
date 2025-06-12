import { IsIos } from "@constants";
import { NAVIGATION_TYPE } from "@constants/navigationType";
import { NavigationEvent } from "@hooks/eventEmitter";
import NavigationEventEmitter from "@hooks/eventEmitter/useNavigationEvent/navigationEventEmitter";

import {
    NavigationProp,
    ParamListBase,
    RouteProp,
    StackActions,
    useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from 'styled-components';

import {RoutesNavigation, RoutesNavigationWithParams} from './routesNavigation';
import BottomTabNavigation from './bottomTabNavigation';
import OnBoardingScreen from '@pages/onBoarding';
import {AsParamListBase} from '@types';
import LogInScreen from '@components/pages/authentication';
import {useTheme} from 'styled-components/native';
import {Icon} from '@components/atoms/common/Icon';
import {IconBack} from '@assets/svg';

export type DirectParamListBase = AsParamListBase<RoutesNavigationWithParams>;

const NativeStack = createNativeStackNavigator();

const modalStackOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: 'slide_from_bottom',
};

const RootNavigation = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme();

  const isHideHomeIndicator = IsIos ? true : true;

  const eventCallback = useCallback(
    (event: NavigationEvent) => {
      const name = event.navigateName;
      const params = event.params;
      if (event.action === NAVIGATION_TYPE.NAVIGATE) {
        navigation.navigate(name, {...params});
      } else if (event.action === NAVIGATION_TYPE.PUSH) {
        const pushAction = StackActions.push(name, {...params});
        navigation.dispatch(pushAction);
      } else if (event.action === NAVIGATION_TYPE.RESET) {
        navigation.reset({
          index: 0,
          routes: [{name}],
        });
      }
      // handle replace
      // else if (event.action === NAVIGATION_TYPE.REPLACE) {
      //     navigation.replace()
      // }
    },
    [navigation],
  );

  useEffect(() => {
    NavigationEventEmitter.addChangeListener(eventCallback);

    return () => {
      NavigationEventEmitter.removeChangeListener();
    };
  }, [eventCallback]);

  const MainStackNavigationOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      title: '',
      animation: 'slide_from_right',
      headerShown: true,
      gestureEnabled: true,
      autoHideHomeIndicator: isHideHomeIndicator ? false : false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: theme['background/bgSecondary'],
      },
      headerLeft: () => (
        <ButtonHitSlop
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <Icon icon={IconBack} width={20} height={20} color={theme['fill/fillPrimary']} />
        </ButtonHitSlop>
      ),
    };
  }, []);

  const AuthStackNavigationOptions = useMemo(
    () =>
      ({route}: {route: RouteProp<ParamListBase, string>}): NativeStackNavigationOptions => {
        return route.name === RoutesNavigation.AUTH
          ? modalStackOption
          : {
              animation: 'slide_from_right',
              headerShown: false,
              gestureEnabled: true,
            };
      },
    [],
  );
  return (
    <NativeStack.Navigator initialRouteName={RoutesNavigation.HOME_TAB}>
      <NativeStack.Group screenOptions={MainStackNavigationOptions}>
        <NativeStack.Screen
          name={RoutesNavigation.HOME_TAB}
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <NativeStack.Screen
          name={RoutesNavigation.ONBOARDING}
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />
      </NativeStack.Group>
      <NativeStack.Group screenOptions={AuthStackNavigationOptions}>
        <NativeStack.Screen
          name={RoutesNavigation.AUTH}
          component={LogInScreen}
          options={{
            headerShown: false,
          }}
        />
      </NativeStack.Group>
    </NativeStack.Navigator>
  );
};
export default RootNavigation;

const ButtonHitSlop = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

