import { Pressable, PressableProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components';
import { useTheme } from '@hooks/useTheme';
import { ColorKey } from '@theme';

import { Icon } from '../Icon';
import { Text } from '../Text';

import { getButtonColor, getButtonStyleBySize, getIconSize, getTextColor, Hierarchy, Size, TypeButton } from './style';

interface Props extends PressableProps {
  type?: TypeButton;
  size?: Size;
  hierarchy?: Hierarchy;
  icon?: React.FC<SvgProps>;
  iconLocation?: 'left' | 'right';
  text?: string;
  //   children?: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode) | undefined;
  numberOfLines?: number;
  borderRadius?: number; //radius
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  iconColor?: string;
  iconSize?: number;
  textColor?: string;
  onlyIcon?: boolean;
  width?: number;
}

const Button = ({
  type,
  size,
  hierarchy,
  icon,
  iconColor,
  iconLocation = 'left',
  iconSize,
  onlyIcon,
  borderColor,
  backgroundColor,
  borderRadius,
  borderWidth,
  width,
  text,
  textColor,
  numberOfLines,
  //   children,
  ...rest
}: Props) => {
  const isOnlyIcon = (icon && !text) || onlyIcon;
  const { theme } = useTheme();
  return (
    <ButtonWrapper
      type={type}
      size={size}
      hierarchy={hierarchy}
      width={width}
      onlyIcon={isOnlyIcon}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      {...rest}>
      {({ pressed }) => (
        <ButtonLayer onlyIcon={isOnlyIcon} iconLocation={iconLocation}>
          {icon && (
            <ButtonIcon
              size={getIconSize(size, iconSize)}
              icon={icon}
              color={
                (iconColor || textColor || (theme[`button/${type}/${hierarchy}/icon` as ColorKey] as string)) ?? 'red'
              }
            />
          )}
          {!isOnlyIcon && (
            <ButtonText
              type={`components/button_${size}`}
              numberOfLines={numberOfLines}
              typeButton={type}
              hierarchy={hierarchy}>
              {text}
            </ButtonText>
          )}
        </ButtonLayer>
      )}
      {/* {children} */}
    </ButtonWrapper>
  );
};

const ButtonIcon = styled(Icon)`
  align-self: center;
`;

const ButtonLayer = styled(View)<Props>`
  flex-direction: ${({ iconLocation }) => (iconLocation === 'left' ? 'row' : 'row-reverse')};
  gap: ${({ theme }) => theme['utilities/dimensions/2']}px;
`;

const ButtonWrapper = styled(Pressable)<Props>`
  ${({ type = 'solid', hierarchy = 'destructive' }) => getButtonColor(type, hierarchy)}
  ${({ size = 'medium' }) => getButtonStyleBySize(size)}
  border-width: ${({ borderWidth, type }) => (borderWidth ? borderWidth : type !== 'link' ? 1 : 0)}px;
  border-radius: ${({ theme, borderRadius }) => borderRadius ?? theme['utilities/borderradius/full']}px;
  align-items: center;
`;

const ButtonText = styled(Text)<{
  typeButton?: TypeButton;
  hierarchy?: Hierarchy;
}>`
  text-decoration-line: ${({ typeButton }) => (typeButton === 'link' ? 'underline' : 'none')};
  ${({ typeButton = 'link', hierarchy = 'destructive' }) => getTextColor(typeButton, hierarchy)}
`;

export default Button;
