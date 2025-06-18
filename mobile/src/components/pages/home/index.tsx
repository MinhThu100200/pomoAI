import {Linking, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text} from '@components/atoms/common/Text';
import analytics from '@react-native-firebase/analytics';
import axios from 'axios';
import Config from 'react-native-config';

const HomeScreen = () => {
  const logTestEvent = async () => {
    // await analytics().logEvent('test_event', {
    //   id: '123',
    //   name: 'Test Item',
    //   description: 'Testing Firebase Analytics',
    // });
    console.log('{Config.APP_TYPE}', Config.APP_TYPE);
  };

  const login = () => {
    const GOOGLE_CLIENT_ID = Config.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${Config.API_BASE_URL}/api/auth/google/callback`;
    const SCOPE = 'openid email profile';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

    Linking.openURL(url);
  };

  const testAPI = async () => {
    try {
      const res = await axios.post(
        'http://172.16.176.217:3000/api/promptAI',
        // 'https://www.pomoai.minhthunt.com/api/promptAI',
        {
          prompt: 'Tôi muốn học IELTS mỗi ngày 1 tiếng vào buổi tối',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res.data);
    } catch (err) {
      console.error('axios error', err);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text color="white" lang="vi-VN">
        {Config.APP_TYPE} llllll
      </Text>
      <Text color="white" lang="en-US">
        Homescreen - en
      </Text>
      <TouchableOpacity onPress={logTestEvent}>
        <Text>hiiii</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={testAPI}>
        <Text>testAPI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
