import messaging from '@react-native-firebase/messaging';

export const getTokenFirebase = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('token firebase from callback usePermission', token);
};
