import { useOpenDashServices } from "../../..";

import type { MonitoringService } from "../../..";

export function useMonitoringService(): MonitoringService {
  const { MonitoringService } = useOpenDashServices();

  return MonitoringService;
}
