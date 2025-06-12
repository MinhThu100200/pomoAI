
export type ValueOf<T extends Object> = T[keyof T];

export const NavigationAction = {
  NAVIGATE: 'navigate',
  RESET: 'reset',
  PUSH: 'push',
} as const;

type ToastActionType = ValueOf<typeof NavigationAction>;

export interface NavigationEvent {
  action: ToastActionType;
  navigateName: string;
  params?: any;
}
