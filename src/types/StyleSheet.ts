// Definitions by: Pat Sissons <https://github.com/patsissons>
// Edited by to support Extended Stylesheets: Wendell Misiedjan<https://github.com/ItsWendell>
// TypeScript Version: 3.4

import * as RN from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export type Theme<T = { [key: string]: any }> = {
  rem?: number;
} & T;

export type AnyStyle<T = {}> = T & {
  [key: string]: T & {
    [key: string]: T & string;
  };
};

export type StyleProp<T = {}> = RN.StyleProp<T> & {
  [key: string]: RN.StyleProp<T>;
};

export type TestType = AnyStyle<RN.ViewStyle>;

export type ReactNativeStyle =
  | ExtendedStyle<RN.ViewStyle>
  | ExtendedStyle<RN.TextStyle>
  | ExtendedStyle<RN.ImageStyle>;

export type CustomClasses =
  | ':first-child'
  | ':nth-child-even'
  | ':nth-child-odd'
  | ':last-child'
  | '@media web'
  | '@media ios'
  | '@media android'
  | '@media macos'
  | '@media windows';

export type MediaTypes = RN.PlatformOSType;

export type CustomProperties = {
  $outline?: boolean;
  $scale?: number;
};

export type ExtendedStyle<T = {}> =
  | T
  | {
      [key in CustomClasses]: T | undefined;
    }
  | {
      [key: string]: T;
    };

export type ReactNativeStyleType<Props> = Props extends {
  style?: StyleProp<infer StyleType>;
}
  ? StyleType extends ReactNativeStyle
    ? StyleType
    : ReactNativeStyle
  : ReactNativeStyle;

export type ExtendedStylesheet = typeof EStyleSheet;

export interface Stylesheet extends ExtendedStylesheet {
  sheets: Array<Record<string, Record<string, string>>>;
}

// export const StyleSheet: Stylesheet;
