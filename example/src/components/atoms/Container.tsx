import styled from '../../providers/styled';
import { Box, BoxProps } from './Box';

export const Container = styled(Box)<BoxProps>({
  width: '100%',
  maxWidth: '75rem',
  marginLeft: 'auto',
  marginRight: 'auto',
});
