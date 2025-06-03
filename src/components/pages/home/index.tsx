import {View, Text} from 'react-native';
import React from 'react';
import {Text as MyText} from '@components/atoms/common/Text';

const HomeScreen = () => {
  const style = {fontFamily: 'Nunito', fontSize: 20};

  console.log('🖋️ Font test style:', style);
  return (
    <View>
      <Text testID="id_home_screen" style={{color: 'white'}}>
        HomeScreen 11111
      </Text>
      <Text style={{color: 'white', fontFamily: 'Nunito-Bold'}}>light ---j yyyy</Text>
      <Text style={{color: 'white', fontFamily: 'Cochin'}}>light ---j yyyy</Text>
      <Text style={{color: 'white', fontFamily: 'Pretendard-Bold'}}>light jjjjj</Text>
      <MyText color="white" lang="vi-VN">
        light - yyy
      </MyText>
      <MyText color="white" lang="en-Us">
        Homescreen
      </MyText>
    </View>
  );
};

export default HomeScreen;
