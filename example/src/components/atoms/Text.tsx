import styled from '../../providers/styled';
import { TextProps as NativeTextProps } from 'react-native';
import { Text as Component } from '@ui-kitten/components';
import {
  color,
  ColorProps,
  typography,
  flexbox,
  FlexboxProps,
  TypographyProps,
  system,
} from 'styled-system';

// Fix for lineHeights, make the lineHeight by default the same size as the font!
const lineHeight = system({
  lineHeight: {
    defaultScale: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    properties: ['fontSize', 'lineHeight'],
    scale: 'fontSizes',
  },
});

type Props = NativeTextProps & ColorProps & TypographyProps & FlexboxProps;

export const Text = styled(Component)<Props>(
  typography,
  color,
  flexbox,
  lineHeight
);
