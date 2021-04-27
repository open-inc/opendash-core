import { useServiceStore, WidgetInterface } from "../../..";

import { useMonitoringService } from "./useMonitoringService";

export function useWidgets(): WidgetInterface<any>[] {
  const monitoring = useMonitoringService();

  return useServiceStore(monitoring, (state) => state.allWidgets);
}
