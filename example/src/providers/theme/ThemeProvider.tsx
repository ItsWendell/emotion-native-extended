import React, { useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';
import { ThemeProvider as EmotionProvider } from 'emotion-theming';
import { useColorScheme } from 'react-native-appearance';

import { ThemeContext } from './ThemeContext';
import { themes } from './theme';
import { StatusBar } from 'react-native';
import { color } from 'styled-system';

type ThemeType = 'light' | 'dark';

export const ThemeProvider: React.FunctionComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<ThemeType>(colorScheme === 'no-preference' ? 'dark' : colorScheme);
  const currentTheme = themes[theme];

  const toggleTheme = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (theme === 'light') {
      StatusBar.setBarStyle('dark-content', true);
    } else if (theme === 'dark') {
      StatusBar.setBarStyle('light-content', true);
    }
  }, [theme]);

  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme('dark');
    } else if (colorScheme === 'light') {
      setTheme('light');
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApplicationProvider mapping={mapping} theme={currentTheme}>
        <EmotionProvider theme={currentTheme}>{children}</EmotionProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};
