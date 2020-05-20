import * as React from "react";

import { useWidgets, WidgetInterface, DashboardInterface } from "../../..";

export function useWidgetsForDashboard(
  dashboard: DashboardInterface
): WidgetInterface[] {
  const widgets = useWidgets();

  return React.useMemo(
    () => widgets.filter((widget) => dashboard?.widgets.includes(widget.id)),
    [widgets, dashboard]
  );
}
