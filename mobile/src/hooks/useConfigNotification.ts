import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {Event, EventType} from '@notifee/react-native';

export const useConfigNotification = () => {
  const requestNotificationPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('token firebase!!!!!!!!', token);
      }
    } catch (error) {
      console.log('token error', error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    notifee.onBackgroundEvent(async ({type, detail: {notification}}: Event) => {
      if (type === EventType.PRESS) {
        // console.log('PRESS onBackgroundEvent !!!!!!!!!', JSON.stringify(notification));
        console.log('loggggggg notification background', type, notification);
      }
    });

    notifee.onForegroundEvent(async ({type, detail: {notification}}: Event) => {
      if (type === EventType.PRESS) {
        // console.log('PRESS onForegroundEvent !!!!!!!!!', JSON.stringify(notification));
        console.log('loggggggg notification foreground', type, notification);
      }
    });
  }, []);
};
