import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { Switch, View } from 'react-native';
import styled from 'styled-components';

export interface SwitchButtonProps {
  name: string;
  value: boolean;
  onPress: (name: string, value: boolean) => void;
  disabled?: boolean;
  size?: number;
}

const SwitchButton = ({ name, value, disabled, onPress, size }: SwitchButtonProps) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(name, !value);
    }
  };
  return (
    <SwitchButtonWrapper style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.75 }] }}>
      <Switch
        trackColor={{ false: theme['bg/neutrals/tertiary'], true: theme['icon/solid/brand'] }}
        thumbColor={disabled ? theme['color/neutrals/800'] : theme['bg/neutrals/primary']}
        ios_backgroundColor="transparent"
        onValueChange={handlePress}
        value={value}
      />
    </SwitchButtonWrapper>
  );
};

export default SwitchButton;

const SwitchButtonWrapper = styled(View)``;
