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
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text color="white" lang="vi-VN">
        light - vi
      </Text>
      <Text color="white" lang="en-Us">
        Homescreen - en
      </Text>
      <TouchableOpacity onPress={logTestEvent}>
        <Text>hiiii</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
