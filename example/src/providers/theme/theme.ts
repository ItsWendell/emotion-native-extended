import { dark as darkTheme, light as lightTheme } from '@eva-design/eva';

export const breakpoints = ['40rem', '52rem', '64rem'];

export const defaultStyledTheme = {
  rem: 16,
  breakpoints,
};

export const light = {
  ...lightTheme,
  ...defaultStyledTheme,
};

export const dark = {
  ...darkTheme,
  ...defaultStyledTheme,
};

export const themes = {
  light: light,
  dark: dark,
};
