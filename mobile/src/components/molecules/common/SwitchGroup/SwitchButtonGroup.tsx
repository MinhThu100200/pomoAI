import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import SwitchButton, { SwitchButtonProps } from '@components/atoms/common/Switch/SwitchButton';
import { FormControlText } from '../FormControlText';

interface SwitchButtonGroupProps extends SwitchButtonProps {
  content?: string;
}

const SwitchButtonGroup = ({ content, name, value, size, ...rest }: SwitchButtonGroupProps) => {
  return (
    <SwitchButtonGroupWrapper>
      <SwitchButton name={name} value={value} size={size} {...rest} />
      <FormControlText name={name} content={content} />
    </SwitchButtonGroupWrapper>
  );
};

export default SwitchButtonGroup;

const SwitchButtonGroupWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/4']};
  align-items: flex-start;
`;
