import {ColorKey, FontStyle, TextStyle, TypographyKey} from '@theme';
import {convertNewline} from '@utils/convertNewLine';
import {TextProps} from 'react-native';
import Reanimated, {AnimatedProps} from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

export type FontFamily = 'Pretendard' | 'Nunito';
export type FontWeight = 'Bold' | 'SemiBold' | 'Regular';
export type TranslationLang = 'en-US' | 'vi-VN';

export const fontWeight: Record<FontWeight, string> = {
  Bold: '700',
  SemiBold: '600',
  Regular: '400',
};

export const letterSpacing: Record<FontFamily, number> = {
  Pretendard: -0.007,
  Nunito: -0.01,
};

export const translationLang: Record<TranslationLang, string> = {
  'en-US': 'Pretendard',
  'vi-VN': 'Nunito',
};

export interface TextPropsCustom extends AnimatedProps<TextProps> {
  type?: keyof TextStyle;
  color?: ColorKey | string;
  lang?: TranslationLang;
}

const Text = ({type, style, children, color, lang, ...props}: TextPropsCustom) => {
  return (
    <TextContainer style={[style]} type={type} color={color} lang={lang} {...props}>
      {typeof children === 'string' ? convertNewline(children) : children}
    </TextContainer>
  );
};

const TextContainer = styled(Reanimated.Text)<TextPropsCustom>`
  ${({type = 'typography/regular/h1', color, theme, lang = 'en-US'}) => {
    const style = theme[type as TypographyKey] as FontStyle;
    const {fontFamily, fontSize, letterSpacing: ls, lineHeight, weight} = style;
    const computedFontFamily = (lang === 'en-US' ? fontFamily : translationLang['vi-VN']) + '-' + weight;

    return css`
      font-family: ${computedFontFamily};
      letter-spacing: ${ls}px;
      font-size: ${fontSize}px;
      line-height: ${lineHeight}px;
      font-weight: ${fontWeight[weight as FontWeight]};
      ${color ? `color: ${theme[color as ColorKey] ?? color};` : ''}
    `;
  }};
`;

export default Text;
