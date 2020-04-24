import styled from 'emotion-native-extended';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  color,
  SpaceProps,
  ColorProps,
} from 'styled-system';
import { ViewProps } from 'react-native';

type FlexProps = FlexboxProps &
  LayoutProps &
  ViewProps &
  SpaceProps &
  ColorProps;

export const Box = styled.View<FlexProps>({}, flexbox, layout, space, color);
