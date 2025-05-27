export enum RoutesNavigation {
    HOME = 'home',
    WEBVIEW = 'webview',
    AUTH = 'auth'
}

export type RoutesNavigationKeys = keyof typeof RoutesNavigation;

export type HomeParams = {
    route: RoutesNavigation.HOME,
    params: undefined
}

export type WebviewParams = {
    route: RoutesNavigation.WEBVIEW
    params: {
        url?: string
    }
}

export type AuthParams = {
  route: RoutesNavigation.AUTH;
  params: undefined;
};

export type RoutesNavigationWithParams = HomeParams | WebviewParams | AuthParams;
