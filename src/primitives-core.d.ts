declare module '@emotion/primitives-core' {
  import EStyleSheet from 'react-native-extended-stylesheet';
  export function createCss(
    StyleSheet: typeof EStyleSheet
  ): EStyleSheet.AnyObject;
}
