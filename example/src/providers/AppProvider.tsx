import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";

export const AppProvider: React.FunctionComponent = ({
  children,
}: {
  children: React.ReactChildren;
}) => <ThemeProvider>{children}</ThemeProvider>;
