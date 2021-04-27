import React from "react";

import { DashboardInterface, useServiceStore } from "../../..";

import { useMonitoringService } from "./useMonitoringService";

export function useDashboard(id: string): DashboardInterface {
  const monitoring = useMonitoringService();

  return useServiceStore(
    monitoring,
    React.useCallback(
      (state) => state.allDashboards.find((db) => db.id === id),
      [id]
    )
  );
}
