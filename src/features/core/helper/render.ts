import * as React from "react";
import * as ReactDOM from "react-dom";

import { OpenDashApp } from "../../..";

export function render(app, element) {
  ReactDOM.render(React.createElement(OpenDashApp, { app }), element);
}
