import { View, Text, Pressable, PressableProps } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

interface OnPressPayload<Name extends string, Value extends boolean> {
  name: Name;
  value: Value;
  [key: string]: any;
}

interface Props<Name extends string = string, Value extends boolean = boolean> extends Omit<PressableProps, 'onPress'> {
  name: Name;
  value: Value;
  onPress: (payload: OnPressPayload<Name, Value>) => void;
}

const RadioButton = ({ name, value, onPress }: Props) => {
  return <RadioWrapper isActive={value}></RadioWrapper>;
};

export default RadioButton;

const RadioWrapper = styled(Pressable)<{
  isActive: boolean;
}>`
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']};
`;

const NestedComponent = styled(View)`
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']};
`;
