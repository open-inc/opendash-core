import React from "react";
import { DashboardInterface, useServiceStore } from "../../..";

import { useMonitoringService } from "./useMonitoringService";

export function useDashboards(): DashboardInterface[] {
  const monitoring = useMonitoringService();

  return useServiceStore(
    monitoring,
    React.useCallback((state) => state.allDashboards, [])
  );
}
