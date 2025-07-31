import { IconGuidePrompt, IconHome, IconProfile, IconPromptBuilder, IconTimer } from '@assets/svg';
import { Icon } from '@components/atoms/common/Icon';
import { Text } from '@components/atoms/common/Text';
import HomeScreen from '@components/pages/home';
import PlannerAIScreen from '@components/pages/plannerAI';
import PomodoroScreen from '@components/pages/pomodoro';
import ProfileScreen from '@components/pages/profile';
import PromptGuideScreen from '@components/pages/promptGuide';
import { IsIos } from '@constants';
import { useTheme } from '@hooks/useTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components';

import { RoutesNavigation } from './routesNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const tabColor = (focused: boolean) => (focused ? theme['badge/ghost/blue/bg'] : theme['text/primary']);

  const tabItem = ({ focused, title, inactiveIcon, activeIcon }: ITabBarIcon) => (
    <TabBarIconBox title={title} focused={focused} inactiveIcon={inactiveIcon} activeIcon={activeIcon} />
  );

  const defaultHeader = () => {
    return (
      IsIos && (
        <View
          style={{
            height: insets.top,
            backgroundColor: theme['bg/neutrals/secondary'],
          }}
        />
      )
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme['icon/soft/brand'],
          alignItems: 'center',
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 80,
        },
        tabBarLabelStyle: { display: 'none' },
        tabBarHideOnKeyboard: true,
        header: defaultHeader,
      }}>
      <Tab.Screen
        name={RoutesNavigation.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabItem({ focused, title: 'Home', inactiveIcon: IconHome, activeIcon: IconHome }),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.PROMPTGUIDE}
        component={PromptGuideScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabItem({ focused, title: 'Guide', inactiveIcon: IconGuidePrompt, activeIcon: IconGuidePrompt }),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.POMODORO}
        component={PomodoroScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabItem({ focused, title: 'Pomodoro', inactiveIcon: IconTimer, activeIcon: IconTimer }),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.PLANNER_AI}
        component={PlannerAIScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabItem({ focused, title: 'Planning', inactiveIcon: IconPromptBuilder, activeIcon: IconPromptBuilder }),
        }}
      />
      <Tab.Screen
        name={RoutesNavigation.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            tabItem({ focused, title: 'Guide', inactiveIcon: IconProfile, activeIcon: IconProfile }),
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

const TabBarIconBox = ({ activeIcon, inactiveIcon, title = '', focused }: ITabBarIcon) => {
  return (
    <BottomTabItemBox>
      <Icon icon={focused ? activeIcon : inactiveIcon} size={16} />
      <Text type="typography/regular/caption">{title}</Text>
    </BottomTabItemBox>
  );
};

export default BottomTabNavigation;

const BottomTabItemBox = styled(View)`
  align-items: center;
  padding: 4px;
  width: 66px;
`;
