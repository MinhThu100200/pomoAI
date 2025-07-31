import { IconCheckMark } from '@assets/svg';
import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { Pressable } from 'react-native';
import styled, { css } from 'styled-components';
import { Icon } from '../Icon';

export type CheckBoxType = 'rounded' | 'square';

export interface CheckBoxProps {
  name: string;
  value: boolean;
  type?: CheckBoxType;
  onPress?: (name: string, value: boolean) => void;
  disabled?: boolean;
  size?: number;
}

const Checkbox = ({ name, value, onPress, type, disabled, size }: CheckBoxProps) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(name, !value);
    }
  };
  return (
    <CheckBoxWrapper disabled={disabled} onPress={handlePress} type={type} value={value} size={size}>
      {value && (
        <Icon
          icon={IconCheckMark}
          size={size ?? 10}
          color={disabled ? theme['icon/neutrals/disable'] : theme['icon/light/brand']}
        />
      )}
    </CheckBoxWrapper>
  );
};

export default Checkbox;

const CheckBoxWrapper = styled(Pressable)<{ disabled?: boolean; type?: string; value: boolean; size?: number }>`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border-width: 1px;
  border-radius: ${({ theme, type = 'square' }) => (type === 'square' ? 2.5 : theme['utilities/borderradius/full'])}px;
  ${({ theme, value = false, disabled }) => {
    if (value) {
      return css`
        background-color: ${disabled ? 'transparent' : theme['icon/solid/brand']};
        border-color: ${disabled ? theme['icon/neutrals/disable'] : theme['icon/solid/brand']};
      `;
    } else {
      return css`
        border-color: ${theme['icon/neutrals/disable']};
      `;
    }
  }};
  height: ${({ size = 18 }) => size}px;
  width: ${({ size = 18 }) => size}px;
  justify-content: center;
  align-items: center;
`;

const CheckBoxIcon = styled(Icon)``;
