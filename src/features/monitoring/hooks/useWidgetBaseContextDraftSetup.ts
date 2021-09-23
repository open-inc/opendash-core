import * as React from "react";

import {
  WidgetContext,
  WidgetConfigInterface,
  useMonitoringService,
} from "../../..";

export function useWidgetBaseContextDraftSetup(
  type: string,
  config: WidgetConfigInterface<any>,
  fullscreen: boolean = false
): WidgetContext {
  const service = useMonitoringService();

  const context = React.useMemo(() => service.createWidgetDraftContext(), []);

  React.useEffect(() => {
    context.setWidget({
      id: undefined,
      name: undefined,
      config: undefined,
      type,
    });
  }, [context, type]);

  React.useEffect(() => {
    context.replaceDraft(config);
  }, [context, config]);

  React.useEffect(() => {
    context.store.update((state) => {
      state.fullscreen = fullscreen;
    });
  }, [context, fullscreen]);

  return context;
}
