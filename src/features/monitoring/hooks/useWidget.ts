import * as React from "react";

import { useAppState, WidgetInterface } from "../../..";

export function useWidget(id: string): WidgetInterface {
  return useAppState((state) =>
    state.dashboards.widgets.find((widget) => widget.id === id)
  );
}
