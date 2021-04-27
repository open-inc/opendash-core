import * as React from "react";

import { useMonitoringService } from "../../..";

import { WidgetContext } from "../services/states/WidgetContext";

export function useWidgetBaseContextSetup(
  id: string,
  fullscreen: boolean = false
): WidgetContext {
  const service = useMonitoringService();

  const context = React.useMemo(() => service.createWidgetContext(id), [id]);

  React.useEffect(() => {
    context.store.update((state) => {
      state.fullscreen = fullscreen;
    });
  }, [context, fullscreen]);

  return context;
}
