import React, { useState, useEffect } from 'react';
import { Layout, Box, Text, Button } from '../components';

export const Home: React.FunctionComponent = () => {
  const [state, setState] = useState(0);
  return (
    <Layout
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        alignItems="center"
        justifyContent="center"
        backgroundColor={['red', 'green', 'blue']}
        padding={[2, 0]}
        margin={2}
      >
        <Text textAlign="center">Hello world!</Text>
        <Text textAlign="center">React Native (Web) - Expo</Text>
        <Box mt={3}>
          <Text
            textAlign="center"
            category="h1"
            lineHeight={[25, 40, 40]}
            fontSize={[2, 4, 5]}
            fontWeight={['bold']}
          >
            Emotion / Styled System / React Native
          </Text>
          <Text textAlign="center" fontSize={[1, 2, 3]}>
            Media Queries supported by 'React Native Extended Stylesheet'
          </Text>
        </Box>
        <Box marginTop={4}>
          <Button
            onPress={() => setState(i => i + 1)}
          >{`Local State ${state}`}</Button>
        </Box>
      </Box>
    </Layout>
  );
};
