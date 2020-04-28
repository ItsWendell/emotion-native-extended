// Definitions by: Pat Sissons <https://github.com/patsissons>
// Adopted for react-native-extended-stylesheet by Wendell Misiedjan <https://github.com/ItsWendell>
// TypeScript Version: 3.4

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeComponentNames,
  ReactNativeComponentProps,
} from './base';
import { ReactNativeStyle, ReactNativeStyleType } from './StyleSheet';

interface Theme {}

export {
  ArrayCSSInterpolation,
  ArrayInterpolation,
  CreateStyledComponent,
  CSSInterpolation,
  FunctionInterpolation,
  Interpolation,
  InterpolationPrimitive,
  ObjectInterpolation,
  StyledComponent,
  StyledOptions,
  ReactNativeComponents,
} from './base';

export { ReactNativeStyle };

export interface CreateCSS<
  StyleType extends ReactNativeStyle = ReactNativeStyle
> {
  (
    template?: TemplateStringsArray,
    ...args: Array<Interpolation | StyleType | CSSInterpolation>
  ): StyleType;

  (...args: Array<CSSInterpolation>): StyleType;

  (...args: Array<StyleType>): StyleType;
}

export type StyledComponents = {
  [ComponentName in ReactNativeComponentNames]: CreateStyledComponent<
    { theme?: Theme },
    ReactNativeComponentProps<ComponentName>,
    ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>
  >;
};

export interface CreateStyled extends BaseCreateStyled, StyledComponents {}
