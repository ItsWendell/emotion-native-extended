import { StyleSheet } from './StyleSheet';
import { createStyled } from '@emotion/primitives-core';
import { CreateStyled } from './types/base';
import { withResponsive } from './responsive';

/**
 * a function that returns a styled component which render styles in React Native
 */
const emotionStyled: CreateStyled = createStyled(StyleSheet);

let styled: CreateStyled = (component: any, options: any) =>
  emotionStyled(withResponsive(component), options);

export { styled };
