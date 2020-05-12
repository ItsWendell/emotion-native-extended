import React from 'react';
import styled from '../providers/styled';
import { Box, Text, Container } from '../components';
import { Text as TextKitten } from '@ui-kitten/components';
import * as RN from 'react-native';

const HoverText = styled(RN.Text)(`
  font-size: 1rem;
  :hover {
    font-size: 2rem;
    color: red;
  }
`);

const StyledStyled = styled(Text)(`
  font-weight: bold;
  color: red;
  :hover {
    color: green;
  }
`);

const HoverTextTesting = styled(TextKitten)({
  fontSize: '1rem',
  ':hover': {
    fontSize: '2rem',
    color: 'red',
  },
});

export const Psuedo = () => (
  <Container p={2}>
    <Box mb={3} maxWidth="40rem">
      <Text
        category="h1"
        fontSize={[4, 5]}
        lineHeight={[4, 5]}
        fontWeight="bold"
      >
        Psuedo Classes Tests
      </Text>
    </Box>
    <Box>
      <HoverTextTesting>Styled using objects...</HoverTextTesting>
      <StyledStyled>Hello World 2</StyledStyled>
    </Box>
  </Container>
);
