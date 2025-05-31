import {View, Text} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@hooks/useTheme';
import {IsIos} from '@constants';
import styled from 'styled-components';
import {RoutesNavigation} from './routesNavigation';
import HomeScreen from '@components/pages/home';
import ProfileScreen from '@components/pages/profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  const tabColor = (focused: boolean) => (focused ? theme['accent/accentPrimary'] : theme['fill/fillTertiary']);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme['container/ctnBgQuaternary'],
          alignItems: 'center',
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 80,
        },
        tabBarLabelStyle: {display: 'none'},
        tabBarHideOnKeyboard: true,
        header: () => {
          return (
            IsIos && (
              <View
                style={{
                  height: insets.top,
                  backgroundColor: theme['background/bgSecondary'],
                }}
              />
            )
          );
        },
      }}>
      <Tab.Screen
        name={RoutesNavigation.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabItemBox>
              {/* <Icon icon={focused ? IcoFillHome : IcoHome} color={tabColor(focused)} size={24} />
              <Text type="label/lb_xs_r" color={focused ? 'label/labelSecondary' : 'label/labelQuaternary'}> */}
              <Text>Home</Text>
            </BottomTabItemBox>
          ),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabItemBox>
              {/* <Icon icon={focused ? IcoFillHome : IcoHome} color={tabColor(focused)} size={24} />
              <Text type="label/lb_xs_r" color={focused ? 'label/labelSecondary' : 'label/labelQuaternary'}> */}
              <Text>Profile</Text>
            </BottomTabItemBox>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const BottomTabItemBox = styled(View)`
  align-items: center;
  padding: 4px;
  width: 62px;
  background-color: red;
`;