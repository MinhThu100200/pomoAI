import { useThemeStore } from "@stores/index.";
import { darkToken, lightToken } from "@theme/themes";
import {useShallow} from 'zustand/react/shallow';

export const useTheme = () => {
  
    const {themeType} = useThemeStore(
      useShallow(state => ({
        themeType: state.themeType
      })),
    );

    return {
      theme: themeType === 'dark' ? darkToken : lightToken,
      themeType: themeType,
    };
}