import { dark as darkTheme, light as lightTheme } from "@eva-design/eva";

export const breakpoints = ['40rem', '52rem', '64rem'];

export const defaultStyledTheme = {
  rem: 16,
  breakpoints: breakpoints,
  // Not supported by styled system yet.
  mediaQueries: {
    small: `@media (min-width: ${breakpoints[0]})`,
    medium: `@media (min-width: ${breakpoints[1]})`,
    large: `@media (min-width: ${breakpoints[2]})`,
  },
};

export const light = {
  ...lightTheme,
  ...defaultStyledTheme,
};

export const dark = {
  ...darkTheme,
  ...defaultStyledTheme
}

export const themes = {
  light: light,
  dark: dark,
};