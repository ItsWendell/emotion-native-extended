import * as RN from 'react-native';

import { CreateStyled, StyledOptions } from '@emotion/native';
import {
  createCss,
  createStyled as createStyledEmotion,
} from '@emotion/primitives-core';

import { StyleSheet } from './StyleSheet';
import { NativeComponents, ExtendedStyleSheet } from './types';
import { responsiveComponent } from './responsive';

const emotionStyled: CreateStyled = createStyledEmotion(StyleSheet);

const createStyled = (
  component: React.ComponentType<any>,
  options?: StyledOptions<any>
) => emotionStyled(responsiveComponent(component), options);

const css = createCss(StyleSheet);

const styled: CreateStyled = Object.keys(NativeComponents).reduce(
  (acc: any, comp: any) => {
    return Object.defineProperty(acc, comp, {
      enumerable: true,
      configurable: false,
      get() {
        const key = comp as keyof typeof NativeComponents;
        return createStyled(RN[key]);
      },
    });
  },
  createStyled
);

export { css, StyleSheet, CreateStyled, ExtendedStyleSheet };

export default styled;
