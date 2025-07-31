import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/atoms/common/Icon';
import { IconClose, IconError, IconInfo, IconLostWifi, IconSuccess, IconWarning } from '@assets/svg';
import { useTheme } from '@hooks/useTheme';
import { Text } from '@components/atoms/common/Text';

export type ToastType = 'success' | 'info' | 'error' | 'warning' | 'network';

export interface ToastProps {
  type: ToastType;
  message?: string;
}

const Toast = ({ type, message }: ToastProps) => {
  const { theme } = useTheme();

  const ToastMessageDefault = {
    success: {
      icon: IconSuccess,
      message: 'Success',
      color: theme['text/success'],
      bgColor: theme['bg/solid/success'],
    },
    error: {
      icon: IconError,
      message: 'Error',
      color: theme['text/negative'],
      bgColor: theme['bg/soft/negative'],
    },
    warning: {
      icon: IconWarning,
      message: 'Warning',
      color: theme['text/warning'],
      bgColor: theme['bg/soft/warning'],
    },
    info: {
      icon: IconInfo,
      message: 'Info',
      color: theme['text/informative'],
      bgColor: theme['bg/soft/informative'],
    },
    network: {
      icon: IconLostWifi,
      message: 'Lost network',
      color: theme['text/primary'],
      bgColor: theme['bg/neutrals/tertiary'],
    },
  };

  return (
    <ToastMessageWrapper backgroundColor={ToastMessageDefault[type].bgColor}>
      <ToastContentWrapper>
        <Icon icon={ToastMessageDefault[type].icon} size={20} />
        <Text type="typography/regular/body_2" color={ToastMessageDefault[type].color}>
          {message ?? ToastMessageDefault[type].message}
        </Text>
      </ToastContentWrapper>
      <Icon icon={IconClose} size={16} />
    </ToastMessageWrapper>
  );
};

export default Toast;

const ToastMessageWrapper = styled(View)<{ backgroundColor: string }>`
  width: 90%;
  gap: ${({ theme }) => theme['utilities/dimensions/4']}px;
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']}px;
  padding: ${({ theme }) => `${theme['utilities/dimensions/3']}px ${theme['utilities/dimensions/4']}px`};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

const ToastContentWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/2']};
`;
