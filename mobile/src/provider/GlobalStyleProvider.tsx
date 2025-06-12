import {useTheme} from '@hooks/useTheme';
import {darkToken, lightToken, ThemeVariables} from '@theme';
import {checkKeyStorage} from '@utils';
import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Dimensions, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';

const {width} = Dimensions.get('window');
const screenMode = width > 578 ? 'm1' : 'm2';

const GlobalStyleProvider = ({children}: PropsWithChildren) => {
  const themeRef = useRef<ThemeVariables>(darkToken);
  themeRef.current.screenMode = screenMode;
  const schema = useColorScheme();

  const {theme} = useTheme();

  useEffect(() => {
    if (checkKeyStorage('theme')) {
      themeRef.current = theme;
    } else {
      themeRef.current = schema === 'dark' ? darkToken : lightToken;
    }
  }, [theme]);

  return <ThemeProvider theme={themeRef.current}>{children}</ThemeProvider>;
};

export default GlobalStyleProvider;
