import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => null,
});

export const useThemeMode = () => {
  const context = React.useContext(ThemeContext);

  return context;
};
