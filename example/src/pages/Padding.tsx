import React from 'react';
import { Box, Text, Card, Container } from '../components';

export const Padding = () => (
  <Container p={2}>
    <Box mb={3} maxWidth="40rem">
      <Text
        category="h1"
        fontSize={[4, 5]}
        lineHeight={[4, 5]}
        fontWeight="bold"
      >
        UI Kitten & Styled System!
      </Text>
      <Text category="s1">
        Testing customization of UI kitten components using the Box component.
      </Text>
      <Box as={Text} mt={3}>
        The Box component has a special property,{' '}
        <Text appearance="hint">as</Text> to wrap the properties to another
        component, normally text does not have layout propeties, but now, thanks
        to Box it does.
      </Box>
    </Box>
    <Box as={Card} status="primary" maxWidth={['100%', '20rem']}>
      <Text>
        This is a pretty cool card, with as status, primary! Thanks to UI
        kitten!
      </Text>
    </Box>
  </Container>
);
