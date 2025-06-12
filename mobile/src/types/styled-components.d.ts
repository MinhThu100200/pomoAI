import { ThemeVariables, VariableKey } from "@theme";

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeVariables{
        [key: VariableKey]: ThemeVariables
    }
}

declare module 'styled-components/native' {
    export interface DefaultTheme extends ThemeVariables {
      [key: VariableKey]: ThemeVariables;
    }
}