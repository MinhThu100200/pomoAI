import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@hooks/useTheme';
import {IsIos} from '@constants';
import styled from 'styled-components';
import {RoutesNavigation} from './routesNavigation';
import HomeScreen from '@components/pages/home';
import ProfileScreen from '@components/pages/profile';
import {Text} from '@components/atoms/common/Text';
import {Icon} from '@components/atoms/common/Icon';
import {SvgProps} from 'react-native-svg';
import {IconHome, IconProfile} from '@assets/svg';

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
            <TabBarIconBox title="Home" focused={focused} inactiveIcon={IconHome} activeIcon={IconHome} />
            // <BottomTabItemBox>
            //   {/* <Icon icon={focused ? IcoFillHome : IcoHome} color={tabColor(focused)} size={24} />
            //   <Text type="label/lb_xs_r" color={focused ? 'label/labelSecondary' : 'label/labelQuaternary'}> */}
            //   <Text>Home</Text>
            // </BottomTabItemBox>
          ),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIconBox title="Profile" focused={focused} inactiveIcon={IconProfile} activeIcon={IconProfile} />

            // <BottomTabItemBox>
            //   {/* <Icon icon={focused ? IcoFillHome : IcoHome} color={tabColor(focused)} size={24} />
            //   <Text type="label/lb_xs_r" color={focused ? 'label/labelSecondary' : 'label/labelQuaternary'}> */}
            //   <Text type="label/lb_xs_r">Profile</Text>
            // </BottomTabItemBox>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface ITabBarIcon {
  activeIcon: React.FC<SvgProps>;
  inactiveIcon: React.FC<SvgProps>;
  title: string;
  focused: boolean;
}

const TabBarIconBox = ({activeIcon, inactiveIcon, title = '', focused}: ITabBarIcon) => {
  return (
    <BottomTabItemBox>
      <Icon icon={IconHome} size={16} />
      {/* <Icon icon={focused ? activeIcon : inactiveIcon} size={16} /> */}
      <Text type="typography/regular/h1">{title}</Text>
    </BottomTabItemBox>
  );
};

export default BottomTabNavigation;

const BottomTabItemBox = styled(View)`
  align-items: center;
  padding: 4px;
  width: 62px;
  background-color: white;
`;
