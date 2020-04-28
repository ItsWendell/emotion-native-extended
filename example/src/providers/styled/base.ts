import { createStyled } from './createStyled';
import { CreateStyled } from './types/base';
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
const emotionStyled = createStyled;

const styled: CreateStyled = (component: any, options: any) =>
  emotionStyled(component, options);

export { styled };
