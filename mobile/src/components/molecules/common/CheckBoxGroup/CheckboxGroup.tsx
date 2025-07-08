import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '@components/atoms/common/Checkbox';
import { CheckBoxProps } from '@components/atoms/common/Checkbox/Checkbox';
import { FormControlText } from '../FormControlText';

interface CheckBoxGroupProps extends CheckBoxProps {
  content?: string;
}

const CheckboxGroup = ({ name, value, size, content, ...rest }: CheckBoxGroupProps) => {
  return (
    <CheckBoxGroupWrapper>
      <Checkbox name={name} value={value} size={size} {...rest} />
      <FormControlText name={name} content={content} />
    </CheckBoxGroupWrapper>
  );
};

export default CheckboxGroup;

const CheckBoxGroupWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/4']};
  align-items: flex-start;
`;
