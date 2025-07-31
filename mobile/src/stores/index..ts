import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import createThemeSlice, { Theme } from './theme/themeStore';
import { devtools } from 'zustand/middleware';
import createSdkSlice, { Sdk } from './sdk/sdkStore';

export const useThemeStore = create(
  devtools(
    immer<Theme>((...a) => ({
      ...createThemeSlice(...a),
    })),
  ),
);
export const useSdkStore = create(
  devtools(
    immer<Sdk>((...a) => ({
      ...createSdkSlice(...a),
    })),
  ),
);
