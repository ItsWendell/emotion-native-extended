import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import { AppProvider } from './providers/AppProvider';
import { Demo } from './Demo';
import { useEffect } from 'react';
import { Platform } from 'react-native';
export const App: React.FunctionComponent = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    }
  }, []);
  return (
    <AppProvider>
      <Demo />
    </AppProvider>
  );
};
