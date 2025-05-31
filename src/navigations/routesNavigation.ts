export enum RoutesNavigation {
  HOME = 'home',
  WEBVIEW = 'webview',
  AUTH = 'auth',
  PROFILE = 'profile',
  ONBOARDING = 'onBoarding',
}

export type RoutesNavigationKeys = keyof typeof RoutesNavigation;

export type HomeParams = {
  route: RoutesNavigation.HOME;
  params: undefined;
};
export type onBoardingParams = {
  route: RoutesNavigation.ONBOARDING;
  params: undefined;
};
export type ProfileParams = {
  route: RoutesNavigation.PROFILE;
  params: undefined;
};

export type WebviewParams = {
  route: RoutesNavigation.WEBVIEW;
  params: {
    url?: string;
  };
};

export type AuthParams = {
  route: RoutesNavigation.AUTH;
  params: undefined;
};

export type RoutesNavigationWithParams = HomeParams | WebviewParams | AuthParams | onBoardingParams | ProfileParams;
