import { ViewProps, View } from 'react-native';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  color,
  SpaceProps,
  ColorProps,
  compose,
} from 'styled-system';
import styled from 'emotion-native-extended';

export type BoxProps = FlexboxProps &
  LayoutProps &
  ViewProps &
  SpaceProps &
  ColorProps;

// Composing style functions is more perfomant than just adding them
export const composeBox = compose(space, flexbox, layout, color);

export const Box = styled(View)<BoxProps>(composeBox);
