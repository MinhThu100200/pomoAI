import { useEffect } from "react";
import messaging from '@react-native-firebase/messaging'

export const useConfigNotification = () => {

    const requestNotificationPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
          
        }
      } catch (error) {
        console.log('token error', error);
      }
    };

    useEffect(() => {
        requestNotificationPermission();
    }, [])
};

 