import * as React from "react";

import { I18nextProvider } from "react-i18next";
import { AntDesignProvider, OpenDashContext } from "../../..";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

export function OpenDashProvider({ app, children }) {
  return (
    <OpenDashContext.Provider value={app}>
      <I18nextProvider i18n={app.i18n}>
        <Router>
          <AntDesignProvider>{children}</AntDesignProvider>
        </Router>
      </I18nextProvider>
    </OpenDashContext.Provider>
  );
}
