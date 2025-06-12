import {DeviceEventEmitter} from 'react-native';

class NavigationEventEmitter {
  private readonly NAVIGATION_EVENT_NAME = 'navigation_change' as const;

  addChangeListener(callback: any) {
    DeviceEventEmitter.addListener(this.NAVIGATION_EVENT_NAME, callback);
  }

  removeChangeListener() {
    DeviceEventEmitter.removeAllListeners(this.NAVIGATION_EVENT_NAME);
  }

  navigate({
    action,
    navigateName,
    params,
  }: {
    action: string;
    navigateName: string;
    params?: any;
  }) {
    DeviceEventEmitter.emit(this.NAVIGATION_EVENT_NAME, {
      action,
      navigateName,
      params,
    });
  }
}

export default new NavigationEventEmitter();
