import * as React from "react";

import { useDashboards, useSource, DashboardInterface } from "../../..";

export function useDashboardsBySource(): DashboardInterface[] {
  const [source, , , , enabled] = useSource();

  const dashboards = useDashboards();

  if (!enabled) {
    return dashboards;
  }

  return React.useMemo(
    () => dashboards.filter((dashboard) => dashboard.source === source?.id),
    [dashboards, source?.id]
  );
}
