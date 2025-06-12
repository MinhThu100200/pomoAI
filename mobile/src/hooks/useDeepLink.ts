import {DirectParamListBase} from '@navigation/rootNavigation';
import {RoutesNavigation} from '@navigation/routesNavigation';
import messaging from '@react-native-firebase/messaging';
import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';

const SCHEMA = 'pomoai';

const prefixes = [`${SCHEMA}://`, `https://${SCHEMA}.com`];

const config = {
  initialRouteName: RoutesNavigation.HOME_TAB,
  screens: {
    [RoutesNavigation.HOME_TAB]: {
      screens: {
        [RoutesNavigation.HOME]: {path: '/', exact: true},
        [RoutesNavigation.PROFILE]: {path: `/${RoutesNavigation.PROFILE}`, exact: true},
        [RoutesNavigation.POMODORO]: {path: `/${RoutesNavigation.POMODORO}`, exact: true},
        [RoutesNavigation.PROMPTGUIDE]: {path: `/${RoutesNavigation.PROMPTGUIDE}`, exact: true},
        [RoutesNavigation.PLANNER_AI]: {path: `/${RoutesNavigation.PLANNER_AI}`, exact: true},
      },
    },
    [RoutesNavigation.NOTIFICATION]: RoutesNavigation.NOTIFICATION,
  },
};

function checkScreen(value: any): value is RoutesNavigation {
  return Object.values(RoutesNavigation).includes(value);
}

const buildDeepLinkFromNotificationData = (data: {navigationId?: string}) => {
  const navigationId = data?.navigationId;
  if (!checkScreen(navigationId)) {
    return null;
  }
  switch (navigationId.toLowerCase()) {
    case RoutesNavigation.HOME_TAB:
    case RoutesNavigation.HOME:
      return `${SCHEMA}://${RoutesNavigation.HOME_TAB}/`;

    case RoutesNavigation.PROFILE:
    case RoutesNavigation.POMODORO:
    case RoutesNavigation.PROMPTGUIDE:
    case RoutesNavigation.PLANNER_AI:
      return `${SCHEMA}://${RoutesNavigation.HOME_TAB}/${navigationId.toLocaleLowerCase()}`;

    case RoutesNavigation.NOTIFICATION:
      return `${SCHEMA}://${RoutesNavigation.NOTIFICATION}/`;
    default:
      return `${SCHEMA}://${RoutesNavigation.HOME_TAB}/`;
  }
};
export const useDeepLink = () => {
  const linking: LinkingOptions<DirectParamListBase> = {
    prefixes,
    config,
    getInitialURL: async () => {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data as any);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({url}: {url: string}) => listener(url);

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage?.data as any);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  return {linking};
};
