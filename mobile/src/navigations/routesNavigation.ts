export enum RoutesNavigation {
  HOME = 'home',
  WEBVIEW = 'webview',
  AUTH = 'auth',
  PROFILE = 'profile',
  ONBOARDING = 'onboarding',
  LOGIN = 'login',
  POMODORO = 'pomodoro',
  NOTIFICATION = 'notification',
  PROMPTGUIDE = 'promptguide',
  HOME_TAB = 'hometab',
  PLANNER_AI = 'plannerai',
}

export type RoutesNavigationKeys = keyof typeof RoutesNavigation;

export type HomeParams = {
  route: RoutesNavigation.HOME;
  params: undefined;
};
export type HomeTabParams = {
  route: RoutesNavigation.HOME_TAB;
  params: undefined;
};
export type PlannerAIParams = {
  route: RoutesNavigation.PLANNER_AI;
  params: undefined;
};
export type LoginParams = {
  route: RoutesNavigation.LOGIN;
  params: undefined;
};
export type NotificationParams = {
  route: RoutesNavigation.NOTIFICATION;
  params: undefined;
};
export type PomodoroParams = {
  route: RoutesNavigation.POMODORO;
  params: undefined;
};
export type PromptGuideParams = {
  route: RoutesNavigation.PROMPTGUIDE;
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

export type RoutesNavigationWithParams =
  | HomeParams
  | WebviewParams
  | AuthParams
  | onBoardingParams
  | ProfileParams
  | LoginParams
  | PomodoroParams
  | NotificationParams
  | PromptGuideParams
  | HomeTabParams
  | PlannerAIParams;
