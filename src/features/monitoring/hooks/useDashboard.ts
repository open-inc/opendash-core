import * as React from "react";

import { useAppState, DashboardInterface } from "../../..";

export function useDashboard(id: string): DashboardInterface {
  return useAppState((state) =>
    state.dashboards.dashboards.find((dashboard) => dashboard.id === id)
  );
}
