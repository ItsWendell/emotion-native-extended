import styled from 'emotion-native-extended';
import { TextProps as NativeTextProps } from 'react-native';
import { Text as Component } from '@ui-kitten/components';
import {
  color,
  ColorProps,
  typography,
  flexbox,
  FlexboxProps,
  TypographyProps,
} from 'styled-system';

type Props = NativeTextProps & ColorProps & TypographyProps & FlexboxProps;

export const Text = styled(Component)<Props>(typography, color, flexbox);
