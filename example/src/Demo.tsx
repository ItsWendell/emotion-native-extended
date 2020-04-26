import React from 'react';
import {
  Layout,
  Button,
  Container,
  Flex,
  Toggle,
  TopNavigation,
  Box,
} from './components';
import { Route } from './providers/react-router';
import { Home } from './pages/Home';
import { SafeAreaView, StatusBar } from 'react-native';
import { useHistory } from './providers/react-router';
import { Padding } from './pages/Padding';
import { useThemeMode } from './providers/theme/ThemeContext';

export const Demo = () => {
  const history = useHistory();
  const themeMode = useThemeMode();
  return (
    <Layout width="100%" height="100%">
      <Box as={SafeAreaView} height="100%" justifyContent="space-between">
        <Container
          marginTop={
            StatusBar.currentHeight
              ? `${StatusBar.currentHeight} + 1rem` // Calculation!
              : `1rem`
          }
        >
          <TopNavigation
            title={'Demo App'}
            accessoryRight={() => (
              <Flex>
                <Button onPress={() => history.push('/')} mr={[1, 3]}>
                  Demo 1
                </Button>
                <Button onPress={() => history.push('/demo2')} mr={[1, 3]}>
                  Demo 2
                </Button>
              </Flex>
            )}
          ></TopNavigation>
          <Route exact path="/" component={Home} />
          <Route path="/demo2" component={Padding} />
        </Container>
        <Container mb={[3, 5]}>
          <Toggle
            checked={themeMode.theme === 'dark'}
            onChange={() => themeMode.toggleTheme()}
          >
            Dark Mode
          </Toggle>
        </Container>
      </Box>
    </Layout>
  );
};
