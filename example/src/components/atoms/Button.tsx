import styled from 'emotion-native-extended';
import { Button as KittenButton } from '@ui-kitten/components';
import { composeBox, BoxProps } from './Box';

export const Button = styled(KittenButton)<BoxProps>(composeBox);
