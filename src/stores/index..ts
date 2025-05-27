import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import createThemeSlice, {Theme} from './theme/themeStore';
import {devtools} from 'zustand/middleware';

export const useThemeStore = create(
  devtools(
    immer<Theme>((...a) => ({
      ...createThemeSlice(...a),
    })),
  ),
);
