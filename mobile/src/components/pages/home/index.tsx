import { Linking, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '@components/atoms/common/Text';
import analytics from '@react-native-firebase/analytics';
import axios from 'axios';
import Config from 'react-native-config';
import { Button } from '@components/atoms/common/Button';
import { IconTimer } from '@assets/svg';
import { Icon } from '@components/atoms/common/Icon';
import { RadioButton } from '@components/atoms/common/RadioButton';
import { OnPressPayload } from '@components/atoms/common/RadioButton/RadioButton';
import { RadioGroup } from '@components/molecules/common/RadioGroup';
import { Checkbox } from '@components/atoms/common/Checkbox';
import { CheckboxGroup } from '@components/molecules/common/CheckBoxGroup';
import SwitchButton from '@components/atoms/common/Switch/SwitchButton';
import SwitchButtonGroup from '@components/molecules/common/SwitchGroup/SwitchButtonGroup';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', rowGap: 8 }}>
      {/* <TouchableOpacity onPress={logTestEvent}>
        <Text>hiiii</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={testAPI}>
        <Text>testAPI</Text>
      </TouchableOpacity> */}
      {/* <Button type="solid" text="Button solid" hierarchy="primary" size="large" icon={IconTimer} />
      <Button type="solid" text="Button solid" hierarchy="disable" size="medium" />
      <Button type="solid" text="Button solid" hierarchy="destructive" size="small" />
      <Button type="outline" text="Button outline" hierarchy="brand" size="large" />
      <Button type="outline" text="Button outline" hierarchy="neutrals" size="medium" />
      <Button type="outline" text="Button outline" hierarchy="destructive" size="small" />
      <Button type="link" text="Button link" hierarchy="brand" size="large" />
      <Button type="link" text="Button link" hierarchy="disable" size="small" /> */}
      <Checkbox name={'Radio'} value={true} onPress={(name: string, value: boolean) => {}} type={'rounded'} />
      <CheckboxGroup name={'Radio'} value={true} onPress={(name: string, value: boolean) => {}} content="hiiii" />
      <SwitchButton name={'Radio'} value={false} onPress={(name: string, value: boolean) => {}} disabled />
      <SwitchButtonGroup
        name={'Radio'}
        value={false}
        onPress={(name: string, value: boolean) => {}}
        disabled
        content="hiiii"
      />
    </View>
  );
};

export default HomeScreen;
