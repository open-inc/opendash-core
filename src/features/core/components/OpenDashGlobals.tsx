import * as React from "react";

import { useOpenDashApp } from "../../..";

export const OpenDashGlobals = React.memo(function OpenDashGlobals() {
  const app = useOpenDashApp();

  const globals = app._internal.globalComponents;

  return (
    <>
      {globals.map(([component, props], i) =>
        React.createElement(component, { key: i, ...props })
      )}
    </>
  );
});
