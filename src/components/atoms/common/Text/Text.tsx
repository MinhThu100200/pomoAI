import {TextProps} from 'react-native';
import styled, {css} from 'styled-components/native';
import Reanimated, {AnimatedProps} from 'react-native-reanimated';
import { IsAndroid } from '@constants';
import { ColorKey, TextStyle, VariableKey } from '@theme';
import { convertNewline } from '@utils/convertNewLine';

export const fontLang = {
    "en-Us": "Pretendard",
    "vi-VN": "Effra Trial"
}

export type FontFamily = 'Effra Trial' | 'Pretendard' | 'Noto Sans';
export type FontWeight = 'Bold' | 'SemiBold' | 'Regular';
export type TranslationLang = 'en-Us' | 'vi-VN';

export const fontWeight: Record<FontWeight, string> = {
  Bold: '700',
  SemiBold: '600',
  Regular: '400',
};

export const letterSpacing: Record<FontFamily, number> = {
  'Effra Trial': 0,
  Pretendard: -0.007,
  'Noto Sans': -0.01,
};

export const translationLang: Record<TranslationLang, string> = {
  'en-Us': 'Pretendard',
  'vi-VN': 'Noto Sans',
};

interface Props extends AnimatedProps<TextProps> {
  type?: keyof TextStyle;
  color?: ColorKey | string;
  lang?: TranslationLang;
}

const Text = ({type, style, children, color, ...props} : Props) => {
  return (
      <TextContainer style={[style]} type={type} color={color} {...props}>{
          typeof children === 'string' ? convertNewline(children) : children
      }</TextContainer>
  )
}

const TextContainer = styled(Reanimated.Text)<Props>`
  ${({ type = 'callToAction/cta_md_r', color, theme, lang = 'en-US' }) => {
    return css`
      ${type &&
      `
        ${IsAndroid ? `font-family: ${lang === 'en-US' ? `${theme[type]?.fontFamily}-${theme[type]?.weight}` : `${translationLang[lang as TranslationLang]}-${theme[type]?.weight}`};` : `font-family: ${lang === 'en-US' ? theme[type]?.fontFamily : translationLang[lang as TranslationLang]};`}
        letter-spacing: ${letterSpacing[theme[type]?.fontFamily as FontFamily] * (theme[type]?.fontSize as number)}px;
        font-size: ${theme[type]?.fontSize}px;
        line-height: ${theme[type]?.lineHeight}px;
        line-height: ${theme?.screenMode}px;
        font-weight: ${fontWeight[theme[type]?.weight as FontWeight]};

      `}

      ${color && `color: ${theme[color as ColorKey] ?? color};`}
    `;
  }};
`;


export default Text