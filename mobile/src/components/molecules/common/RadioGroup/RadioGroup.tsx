import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from '@components/atoms/common/RadioButton';

import { RadioButtonProps } from '@components/atoms/common/RadioButton/RadioButton';
import styled from 'styled-components';
import { FormControlText } from '../FormControlText';

const RadioGroup = ({ name, value, content, size, ...rest }: RadioButtonProps) => {
  return (
    <RadioGroupWrapper>
      <RadioButton name={name} value={value} size={size} {...rest} />
      <FormControlText name={name} content={content} />
    </RadioGroupWrapper>
  );
};

export default RadioGroup;

const RadioGroupWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/4']};
  align-items: flex-start;
`;
