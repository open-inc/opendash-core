import * as React from "react";

import {
  useForceRender,
  useOpenDashServices,
  DashboardInterface,
} from "../../..";

export function useDashboardCurrent(): [
  DashboardInterface,
  (next: DashboardInterface) => void
] {
  const { DashboardService } = useOpenDashServices();

  const forceRender = useForceRender();

  React.useEffect(() => {
    return DashboardService.subscribe(() => {
      forceRender();
    });
  }, []);

  return [
    DashboardService.getCurrentDashboard(),
    React.useCallback((input: DashboardInterface) => {
      DashboardService.setCurrentDashboard(input);
    }, []),
  ];
}
