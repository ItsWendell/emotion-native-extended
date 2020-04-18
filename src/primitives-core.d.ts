declare module '@emotion/primitives-core' {
  import EStyleSheet from 'react-native-extended-stylesheet';
  import { CreateStyled } from '@emotion/native';
  export function createCss(
    StyleSheet: typeof EStyleSheet
  ): (...args: any[]) => any;
  export function createStyled(StyleSheet: typeof EStyleSheet): CreateStyled;
}
