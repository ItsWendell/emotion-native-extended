import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { Router } from './react-router';

export const AppProvider: React.FunctionComponent = ({
  children,
}: {
  children: React.ReactChildren;
}) => (
  <ThemeProvider>
    <Router>{children}</Router>
  </ThemeProvider>
);
