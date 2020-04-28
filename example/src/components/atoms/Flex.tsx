import styled from '../../providers/styled';
import { Box, BoxProps } from './Box';

export const Flex = styled(Box)<BoxProps>({
  flexDirection: 'row',
});
