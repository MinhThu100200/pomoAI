import {FontStyle, TextStyle, TypographyKey} from '@theme';
import {css} from 'styled-components/native';

import {FontWeight, fontWeight, translationLang} from './Text';

export const getFont = (type: keyof TextStyle, lang: 'en-US' | 'vi-VN' = 'en-US') => {
  return css`
    ${({theme}) => {
      const style = theme[type as TypographyKey] as FontStyle;
      const {fontFamily, fontSize, letterSpacing: ls, lineHeight, weight} = style;
      const computedFontFamily = (lang === 'en-US' ? fontFamily : translationLang['vi-VN']) + '-' + weight;
      return `font-family: ${computedFontFamily}; 
          letter-spacing: ${ls}px;
          font-size: ${fontSize}px;
          line-height: ${lineHeight}px;
          font-weight: ${fontWeight[weight as FontWeight]};`;
    }}
  `;
};
