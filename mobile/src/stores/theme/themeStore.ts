import {storage} from '@utils';
import {StateCreator} from 'zustand';

type ThemeType = 'light' | 'dark';

type ThemeProps = {
  themeType: ThemeType;
};
type ThemeActions = {
  setThemeType: (themeType: ThemeType) => void;
};

export type Theme = ThemeProps & ThemeActions;

const localTheme = storage.getString('theme');

const createThemeSlice: StateCreator<Theme> = set => ({
  themeType: localTheme === 'light' ? 'light': 'dark',
  setThemeType: themeType => {
    set(() => ({
      themeType: themeType,
    }));
    storage.set('theme', themeType);
  },
});

export default createThemeSlice;