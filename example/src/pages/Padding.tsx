import React from 'react';
import { Box, Text } from '../components';

export const Padding = () => (
  <Box flexDirection="column" p={[2, 4, 6]} margin={[2, 4, 6]}>
    <Text category="h1">
      Hello World
    </Text>
    <Text>Hi!</Text>
  </Box>
);
