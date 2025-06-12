import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text} from '@components/atoms/common/Text';
import analytics from '@react-native-firebase/analytics';

const HomeScreen = () => {
  const logTestEvent = async () => {
    await analytics().logEvent('test_event', {
      id: '123',
      name: 'Test Item',
      description: 'Testing Firebase Analytics',
    });
  };

  const testAPI = async () => {
    try {
      console.log('call api');
      const response = await fetch('http://172.16.176.217:3000/api/promptAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: 'Tôi muốn học IELTS mỗi ngày 1 tiếng vào buổi tối'}),
      });
      console.log('response', response);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log('vercelllllll', e);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text color="white" lang="vi-VN">
        light - vi
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
 