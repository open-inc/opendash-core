import * as React from "react";

import { useAppState, WidgetInterface } from "../../..";

export function useWidgets(): WidgetInterface[] {
  return useAppState((state) => state.dashboards.widgets);
}
