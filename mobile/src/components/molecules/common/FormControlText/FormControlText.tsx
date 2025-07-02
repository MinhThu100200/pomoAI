import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { Text } from '@components/atoms/common/Text';
import { RadioButtonProps } from '@components/atoms/common/RadioButton/RadioButton';
import { useTheme } from '@hooks/useTheme';

type FormControlTextType = Pick<RadioButtonProps, 'name' | 'content'>;

const FormControlText = ({ name, content }: FormControlTextType) => {
  const { theme } = useTheme();
  return (
    <TextWrapper>
      <Title>{name}</Title>
      {content && <Content type={'components/helper_text'}>{content}</Content>}
    </TextWrapper>
  );
};

export default FormControlText;

const TextWrapper = styled(View)<{ content?: string }>`
  justify-content: ${({ content }) => (content ? `flex-start` : 'center')};
`;
const Content = styled(Text)`
  color: ${({ theme }) => theme['text/secondary']};
`;
const Title = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.01px;
  color: ${({ theme }) => theme['text/primary']};
`;
