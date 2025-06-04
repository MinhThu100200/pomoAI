import {View, Text as TextNative} from 'react-native';
import React from 'react';
import {Text} from '@components/atoms/common/Text';

const HomeScreen = () => {
  const style = {fontFamily: 'Nunito', fontSize: 20};

  console.log('🖋️ Font test style:', style);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text color="white" lang="vi-VN">
        light - yyy
      </Text>
      <Text color="white" lang="en-Us">
        Homescreen
      </Text>
      <TextNative style={{fontFamily: 'Nunito-Bold', fontSize: 30, color: 'white'}}>light - yyy</TextNative>
    </View>
  );
};

export default HomeScreen;
