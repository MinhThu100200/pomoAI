import { css } from 'styled-components/native';
import { ChipStatusColorType, ChipStatusSizeType, ChipStatusType } from './ChipStatus';

export const getColorChipStatus = (
  color: ChipStatusColorType = 'green',
  type: ChipStatusType = 'solid',
  size: ChipStatusSizeType = 'md',
) => {
  return css`
    background-color: ${({ theme }) => theme[`badge/${type}/${color}/bg`]};
    ${({ theme }) => {
      if (size === 'md') {
        return `
            padding: ${theme['utilities/dimensions/0/5']}px ${theme['utilities/dimensions/1/5']}px
          `;
      }
      return `
      padding: ${theme['utilities/dimensions/1']}px ${theme['utilities/dimensions/1/5']}px
    `;
    }}
    ${({ theme }) => {
      if (type === 'outline') {
        return `
            border-color: ${theme[`badge/${type}/${color}/divider`]}
          `;
      }
    }}
  `;
};

export const getTextColor = (color: ChipStatusColorType = 'green', type: ChipStatusType = 'solid') => {
  console.log('color, type', color, type);
  return `badge/${type}/${color}/text`;
};
