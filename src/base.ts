import { StyleSheet } from './StyleSheet';
import { createStyled } from '@emotion/primitives-core';
import { CreateStyled } from './types/base';
import { withResponsive } from './responsive';
import { View, Text, Image } from 'react-native';
import {
  testPickPropsOnPrimitiveComponent,
  testPickPropsOnOtherComponent,
} from './test-props';

export function getShouldForwardProp(component: React.ElementType) {
  switch (component) {
    case View:
    case Text:
    case Image: {
      return testPickPropsOnPrimitiveComponent;
    }
  }
  return testPickPropsOnOtherComponent;
}

/**
 * a function that returns a styled component which render styles in React Native
 */
const emotionStyled: CreateStyled = createStyled(StyleSheet, {
  getShouldForwardProp,
});

const styled: CreateStyled = (component: any, options: any) =>
  emotionStyled(withResponsive<typeof component>(component), options);

export { styled };
