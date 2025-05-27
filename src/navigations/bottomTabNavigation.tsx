import {View, Text} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BottomTabNavigation = () => {
  const insets = useSafeAreaInsets();

  

  return (
    <View>
      <Text>BottomTabNavigation</Text>
    </View>
  );
};

export default BottomTabNavigation;
