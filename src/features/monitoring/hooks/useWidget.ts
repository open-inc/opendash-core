import React from "react";

import { useServiceStore, WidgetInterface } from "../../..";

import { useMonitoringService } from "./useMonitoringService";

export function useWidget(id: string): WidgetInterface {
  const monitoring = useMonitoringService();

  return useServiceStore(
    monitoring,
    React.useCallback(
      (state) => state.allWidgets.find((widget) => widget.id === id),
      [id]
    )
  );
}
