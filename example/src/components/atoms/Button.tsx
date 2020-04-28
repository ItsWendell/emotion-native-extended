import styled from '../../providers/styled';
import { Button as KittenButton } from '@ui-kitten/components';
import { composeBox, BoxProps } from './Box';

export const Button = styled(KittenButton)<BoxProps>(composeBox);
