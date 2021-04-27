import * as React from "react";

import {
  useForceRender,
  useOpenDashServices,
  DashboardInterface,
  useMonitoringService,
} from "../../..";

export function useDashboardCurrent(): [
  DashboardInterface,
  (next: DashboardInterface) => void
] {
  const MonitoringService = useMonitoringService();

  const forceRender = useForceRender();

  React.useEffect(() => {
    return MonitoringService.subscribe(() => {
      forceRender();
    });
  }, []);

  return [
    MonitoringService.getCurrentDashboard(),
    React.useCallback((input: DashboardInterface) => {
      MonitoringService.setCurrentDashboard(input);
    }, []),
  ];
}
