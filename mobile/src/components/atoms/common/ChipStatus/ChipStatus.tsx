import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from '../Text';
import { getColorChipStatus, getTextColor } from './style';

export type ChipStatusType = 'solid' | 'soft' | 'outline' | 'ghost';

export type ChipStatusColorType = 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray';

export type ChipStatusSizeType = 'sm' | 'md';
export interface ChipStatusProps {
  type: ChipStatusType;
  color: ChipStatusColorType;
  content: string;
  size: ChipStatusSizeType;
}

const ChipStatus = ({ type, color, content, size }: ChipStatusProps) => {
  return (
    <ChipStatusWrapper type={type} color={color} size={size}>
      <Text type="components/chip" color={getTextColor(color, type)}>
        {content}
      </Text>
    </ChipStatusWrapper>
  );
};

export default ChipStatus;

const ChipStatusWrapper = styled(View)<{
  type: ChipStatusType;
  size: ChipStatusSizeType;
  color: ChipStatusColorType;
}>`
  border-radius: ${({ theme }) => theme['utilities/borderradius/full']}px;
  ${({ type, size, color }) => getColorChipStatus(color, type, size)}
`;
