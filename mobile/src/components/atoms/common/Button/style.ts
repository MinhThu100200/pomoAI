import { css } from 'styled-components/native';

export type TypeButton = 'solid' | 'outline' | 'link';
export type Hierarchy = 'primary' | 'brand' | 'disable' | 'destructive' | 'neutrals';
export type Size = 'large' | 'medium' | 'small';

export const defaultColorButtonSolid = {
  primary: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/solid/primary/bg']};
        border-color: ${theme['button/solid/primary/bg']};
        `;
    }}
  `,
  disable: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/solid/disable/bg']};
        border-color: ${theme['border/primary']};
        `;
    }}
  `,
  destructive: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/solid/destructive/bg']};
        border-color: ${theme['button/solid/destructive/bg']};
        `;
    }}
  `,
};
export const defaultColorButtonOutline = {
  brand: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/outline/brand/bg']};
        border-color: ${theme['button/outline/brand/divider']};
        `;
    }}
  `,
  neutrals: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/outline/neutrals/bg']};
        border-color: ${theme['button/outline/neutrals/divider']};
        `;
    }}
  `,
  destructive: css`
    ${({ theme }) => {
      return `
        background-color: ${theme['button/outline/destructive/bg']};
        border-color: ${theme['button/outline/destructive/divider']};
        `;
    }}
  `,
};

export const defaultColorTextSolid = {
  primary: css`
    color: ${({ theme }) => theme['button/solid/primary/text']};
  `,
  disable: css`
    color: ${({ theme }) => theme['button/solid/disable/text']};
  `,
  destructive: css`
    color: ${({ theme }) => theme['button/solid/destructive/text']};
  `,
};
export const defaultColorTextOutline = {
  brand: css`
    color: ${({ theme }) => theme['button/outline/brand/text']};
  `,
  neutrals: css`
    color: ${({ theme }) => theme['button/outline/neutrals/text']};
  `,
  destructive: css`
    color: ${({ theme }) => theme['button/outline/destructive/text']};
  `,
};
export const defaultColorTextLink = {
  brand: css`
    color: ${({ theme }) => theme['button/link/brand/text']};
  `,
  disable: css`
    color: ${({ theme }) => theme['button/link/disable/text']};
  `,
};

export const buttonTextColor = {
  solid: defaultColorTextSolid,
  outline: defaultColorTextOutline,
  link: defaultColorTextLink,
} as const;

export const buttonColor = {
  solid: defaultColorButtonSolid,
  outline: defaultColorButtonOutline,
  link: {},
} as const;

export const buttonStylePadding = {
  large: css`
    padding: ${({ theme }) => theme['utilities/dimensions/4']}px;
  `,
  medium: css`
    padding: ${({ theme }) => `${theme['utilities/dimensions/3']}px ${theme['utilities/dimensions/4']}px`};
  `,
  small: css`
    padding: ${({ theme }) => `${theme['utilities/dimensions/2']}px ${theme['utilities/dimensions/4']}px`};
  `,
};

export const defaultSizeIcon = {
  large: 20,
  medium: 18,
  small: 17,
};

export const getTextColor = (type: TypeButton, hierarchy: Hierarchy) => {
  return css`
    ${() => {
      const colorText = buttonTextColor[type] as Record<string, ReturnType<typeof css>>;
      console.log('colorText', colorText, type, hierarchy);
      return colorText[hierarchy] ?? colorText.destructive;
    }}
  `;
};

export const getButtonColor = (type: TypeButton, hierarchy: Hierarchy) => {
  return css`
    ${() => {
      const typeButton = buttonColor[type] as Record<string, ReturnType<typeof css>>;
      return typeButton[hierarchy] ?? typeButton.destructive;
    }}
  `;
};

export const getButtonStyleBySize = (size: Size) => {
  return css`
    ${() => {
      return buttonStylePadding[size];
    }}
  `;
};

export const getIconSize = (size?: Size, iconSize?: number): number => {
  if (size) {
    return defaultSizeIcon[size] as number;
  }
  return iconSize || 20;
};
