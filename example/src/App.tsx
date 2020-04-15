import React from "react";
import { Home } from "./pages/Home";

import { AppProvider } from "./providers/AppProvider";

export const App: React.FunctionComponent = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};
