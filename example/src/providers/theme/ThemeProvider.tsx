import React, { useEffect } from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping, light, dark } from "@eva-design/eva";

import { ThemeContext } from "./ThemeContext";
import { themes } from "./theme";

export const ThemeProvider: React.FunctionComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = React.useState("dark");
  const currentTheme = themes[theme];

  const toggleTheme = (): void => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          {children}
        </ApplicationProvider>
      </ThemeContext.Provider>
  );
};
