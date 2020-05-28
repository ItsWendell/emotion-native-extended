import { createStyled } from './createStyled';
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

const styled = createStyled;

export { styled };
