import React, { useState } from 'react';
import { Box, Text, Button } from '../components';

export const Home: React.FunctionComponent = () => {
  const [state, setState] = useState(0);
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={['red', 'green', 'blue']}
      padding={'1rem'}
      margin={[2, 4, 5]}
      flexDirection={['column', 'row']}
    >
      <Box mr={[0, 4]} flex={[0, 1]}>
        <Text textAlign="center" category="h1">
          Hello world!
        </Text>
        <Text textAlign="center" category="s1">
          React Native (Web) - Expo
        </Text>
      </Box>
      <Box mt={[2, 0]} flex={[0, 2]}>
        <Text
          textAlign="center"
          category="h2"
          fontSize={[2, 3]}
          fontWeight="bold"
          flexWrap="wrap"
          numberOfLines={2}
        >
          Emotion / Styled System / React Native
        </Text>
        <Text
          textAlign="center"
          fontSize={[1, 2]}
          flexWrap="wrap"
          numberOfLines={2}
        >
          Media Queries supported by &apos;React Native Extended
          Stylesheet&apos;
        </Text>
        <Box marginTop={4}>
          <Button onPress={() => setState((i: number) => i + 1)}>
            {`Local State ${state}`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
