import * as React from "react";

import { useAppState, DashboardInterface } from "../../..";

export function useDashboards(): DashboardInterface[] {
  return useAppState((state) => state.dashboards.dashboards);
}
