declare module '@emotion/primitives-core' {
  import EStyleSheet from 'react-native-extended-stylesheet';
  export function createCss(
    StyleSheet: typeof EStyleSheet
  ): (...args: any[]) => any;
  export function createStyled(
    StyleSheet: typeof EStyleSheet,
    {
      getShouldForwardProp,
    }: {
      getShouldForwardProp?: (
        component: React.ElementType
      ) => (propName: string) => boolean;
    }
  ): any;
}
