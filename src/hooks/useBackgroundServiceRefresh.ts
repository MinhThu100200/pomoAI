import {useEffect, useRef} from 'react';
import {useAppState} from '@react-native-community/hooks';
import {useQueryClient} from '@tanstack/react-query';

const RELEASE_LIMIT_TIME = 3 * 60 * 60 * 1000;
const DEBUG_LIMIT_TIME = 3 * 60 * 1000;

const LIMIT_TIME = RELEASE_LIMIT_TIME; 

const useBackgroundServiceRefresh = () => {
  const queryClient = useQueryClient();
  const appState = useAppState();

  const lastBackgroundTime = useRef<number | null>(null);

  useEffect(() => {
    if (appState === 'background') {
      lastBackgroundTime.current = Date.now();
      return;
    }

    if (appState === 'active' && lastBackgroundTime.current) {
      const now = Date.now();
      const elapsedTime = now - lastBackgroundTime.current;

      if (elapsedTime >= LIMIT_TIME) {
        queryClient.invalidateQueries(); // mark stale for cache
      }

      lastBackgroundTime.current = null;
    }
  }, [appState, queryClient]);
};

export default useBackgroundServiceRefresh;
