declare module '@emotion/primitives-core' {
  import EStyleSheet from 'react-native-extended-stylesheet';
  export type StyledOptions<T = {}> = T & {
    shouldForwardProp?: (prop: string) => boolean;
  };
  export type CreateStyled = (
    component: React.ComponentType<any>,
    options?: StyledOptions
  ) => (
    ...rawStyles: any
  ) => React.ForwardRefExoticComponent<React.RefAttributes<any>>;
  export function createCss(
    StyleSheet: typeof EStyleSheet
  ): (...args: any[]) => any;
  export function createStyled(StyleSheet: typeof EStyleSheet): CreateStyled;
}
