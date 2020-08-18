import * as React from "react";

import { AntDesignProvider, OpenDashContext } from "../../..";
import { BrowserRouter as Router } from "react-router-dom";

export function OpenDashProvider({ app, children }) {
  return (
    <OpenDashContext.Provider value={app}>
      <Router>
        <AntDesignProvider>{children}</AntDesignProvider>
      </Router>
    </OpenDashContext.Provider>
  );
}
