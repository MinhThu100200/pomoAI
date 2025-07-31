import { Pressable, View } from 'react-native';
import React, { useMemo } from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components';
import { Icon } from '@components/atoms/common/Icon';
import { IconBack, IconClose, IconContinue, IconMore } from '@assets/svg';
import { Text } from '@components/atoms/common/Text';
import { TypographyKey } from '@theme';
import { useTheme } from '@hooks/useTheme';

export type HeaderSize = 'large' | 'medium' | 'small';

export const TitleStyle = {
  large: 'typography/bold/h3',
  medium: 'typography/bold/h4',
  small: 'typography/regular/h5',
};

export interface HeaderProps {
  title: string;
  isShowButtonBack?: boolean;
  iconRight?: React.FC<SvgProps>;
  secondIconRight?: React.FC<SvgProps>;
  iconBack?: React.FC<SvgProps>;
  size?: HeaderSize;
  onPressMore?: () => void;
  onPressSecondIcon?: () => void;
  onPressPlaceholder?: () => void;
  placeholderText?: string;
}

const Header = ({
  title,
  isShowButtonBack = true,
  size,
  onPressMore,
  onPressPlaceholder,
  onPressSecondIcon,
  iconBack,
  iconRight,
  placeholderText,
  secondIconRight,
}: HeaderProps) => {
  const { theme } = useTheme();

  const titleSize = useMemo(() => {
    if (size) {
      return TitleStyle[size];
    }
    return TitleStyle.small;
  }, [size]);
  return (
    <HeaderWrapper>
      <LeftComponentWrapper>
        {isShowButtonBack && (
          <IconBackButton>
            <Icon icon={iconBack ?? IconContinue} color={theme['icon/solid/informative']} size={22} />
          </IconBackButton>
        )}
        <Text type={titleSize as TypographyKey} color={theme['text/primary']}>
          {title}
        </Text>
      </LeftComponentWrapper>
      {(onPressPlaceholder || onPressSecondIcon || onPressMore) && (
        <RightComponentWrapper>
          {onPressPlaceholder && (
            <PlaceholderButton onPress={onPressPlaceholder}>
              <Text type="components/button_medium" color={theme['text/informative']}>
                {placeholderText}
              </Text>
            </PlaceholderButton>
          )}
          {onPressSecondIcon && (
            <SecondRightIconButton onPress={onPressSecondIcon}>
              <Icon icon={secondIconRight ?? IconClose} size={30} />
            </SecondRightIconButton>
          )}
          {onPressMore && (
            <SecondRightIconButton onPress={onPressMore}>
              <Icon icon={iconRight ?? IconMore} size={30} />
            </SecondRightIconButton>
          )}
        </RightComponentWrapper>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => `0px ${theme['utilities/dimensions/2']}px`};
`;

const LeftComponentWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/2']};
  align-items: center;
`;

const RightComponentWrapper = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme['utilities/dimensions/2']};
  align-items: center;
`;

const PlaceholderButton = styled(Pressable)``;

const SecondRightIconButton = styled(Pressable)``;
const IconBackButton = styled(Pressable)``;
