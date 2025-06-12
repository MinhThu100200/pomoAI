import {useCallback} from 'react';

import {NavigationEvent} from './type';
import navigationEventEmitter from './navigationEventEmitter';

export const useNavigationEvent = () => {
  const navigate = useCallback((navigation: NavigationEvent) => {
    navigationEventEmitter.navigate(navigation);
  }, []);

  return {
    navigate,
  };
};
