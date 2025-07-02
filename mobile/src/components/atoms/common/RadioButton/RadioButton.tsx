import { View, Text, Pressable, PressableProps } from 'react-native';
import React from 'react';
import styled, { css } from 'styled-components/native';

export interface OnPressPayload<Name extends string, Value extends boolean> {
  name: Name;
  value: Value;
  [key: string]: any;
}

export interface RadioButtonProps<Name extends string = string, Value extends boolean = boolean>
  extends Omit<PressableProps, 'onPress'> {
  name: Name;
  value: Value;
  onPress: (payload: OnPressPayload<Name, Value>) => void;
  size?: number;
  content?: string;
}

const RadioButton = ({ name, value, onPress, size, ...rest }: RadioButtonProps) => {
  const handlePress = () => {
    onPress({ name, value });
  };
  return (
    <RadioWrapper isActive={value} size={size} {...rest} onPress={handlePress}>
      {value && <NestedComponent size={size} />}
    </RadioWrapper>
  );
};

export default RadioButton;

const RadioWrapper = styled(Pressable)<{
  isActive: boolean;
  size?: number;
}>`
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']}px;
  border-width: 1px;
  border-color: ${({ theme, isActive }) => (isActive ? theme['icon/solid/brand'] : theme['icon/neutrals/disable'])};
  justify-content: center;
  align-items: center;
  ${({ size }) => {
    if (size) {
      return css`
        height: ${size}px;
        width: ${size}px;
      `;
    }
  }}
`;

const NestedComponent = styled(View)<{ size?: number }>`
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']}px;
  background-color: ${({ theme }) => theme['icon/solid/brand']};
  ${({ size }) => {
    if (size) {
      return css`
        height: ${size / 2}px;
        width: ${size / 2}px;
      `;
    }
  }}
`;
