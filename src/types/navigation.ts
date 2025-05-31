import { RoutesNavigationWithParams } from "@navigation/routesNavigation";

export interface IRouteWithParams {
  route: string;
  params: any;
}

export type AsParamListBase<T extends IRouteWithParams> = {
  [k in T['route']]: T extends {route: k; params: infer P} ? P : never;
};

export type DirectParamListBase = AsParamListBase<RoutesNavigationWithParams>;