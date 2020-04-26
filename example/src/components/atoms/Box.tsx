import React from 'react';
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

export const BaseBox = styled(View)<BoxProps>(composeBox);

export const Box = <C extends React.ComponentType<any>>({
  as,
  children,
  ...props
}: {
  as?: C;
  children?: JSX.Element | JSX.Element[];
} & BoxProps &
  React.ComponentProps<C>) => {
  const Component = as ? styled(as)<BoxProps>(composeBox) : BaseBox;

  return <Component {...props}>{children}</Component>;
};
