import * as React from "react";

import {
  useWidgetType,
  useObjectState,
  WidgetComponentStateInterface,
  WidgetContext,
  WidgetConfigInterface,
  WidgetInterface,
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
    context.widget = {
      id: undefined,
      name: undefined,
      config,
      type,
    };
  }, [context, type, config]);

  return context;
}
