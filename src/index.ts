import * as ReactNative from 'react-native';

import { createCss } from '@emotion/primitives-core';
import { StyleSheet } from './StyleSheet';

import { createStyled } from './create';
import { NativeComponents, Styled } from './types';

/**
 * a function that returns a styled component which render styles in React Native
 */
const css = createCss(StyleSheet);

const styled: Styled = Object.keys(NativeComponents).reduce(
  (acc: any, comp: any) => {
    return Object.defineProperty(acc, comp, {
      enumerable: true,
      configurable: false,
      get() {
        const key = comp as keyof typeof NativeComponents;
        return createStyled(ReactNative[key]);
      },
    });
  },
  createStyled
);

export { css, StyleSheet };

export default styled;
