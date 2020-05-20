import * as React from "react";
import * as ReactDOM from "react-dom";

import { useOpenDashApp, AppRefsInterface } from "../../..";

interface Props {
  place: keyof AppRefsInterface;
}

export const AppPortal = React.memo<React.PropsWithChildren<Props>>(
  function AppPortal({ place, children }) {
    const app = useOpenDashApp();

    if (!app.ui.refs[place].current) {
      return null;
    }
    return ReactDOM.createPortal(children, app.ui.refs[place].current);
  }
);
