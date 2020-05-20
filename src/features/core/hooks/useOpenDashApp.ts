import * as React from "react";

import { OpenDashContext } from "../../..";

import { AppInterface } from "../../..";

export function useOpenDashApp(): AppInterface {
  return React.useContext(OpenDashContext);
}
