import React from 'react';
import { Layout, Box, Button, Container, Flex } from './components';
import { Route } from './providers/react-router';
import { Home } from './pages/Home';
import { SafeAreaView, StatusBar } from 'react-native';
import { useHistory } from './providers/react-router';
import { Padding } from './pages/Padding';

export const Demo = () => {
  const history = useHistory();
  return (
    <Layout width="100%" height="100%">
      <SafeAreaView>
        <Container
          marginTop={
            StatusBar.currentHeight
              ? `${StatusBar.currentHeight} + 1rem` // Calculation!
              : `1rem`
          }
        >
          <Flex width="100%" alignItems="center" justifyContent="center">
            <Button onPress={() => history.push('/')} mr={3}>
              Demo 1
            </Button>
            <Button onPress={() => history.push('/demo2')}>Demo 2</Button>
          </Flex>
        </Container>
        <Container>
          <Route exact path="/" component={Home} />
          <Route path="/demo2" component={Padding} />
        </Container>
      </SafeAreaView>
    </Layout>
  );
};
