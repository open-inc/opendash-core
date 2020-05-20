import * as React from "react";

import { useOpenDashApp } from "../../..";

import { WidgetTypePresetsInterface } from "../../..";

export function useWidgetPresets(): WidgetTypePresetsInterface[] {
  const app = useOpenDashApp();

  return React.useMemo(() => {
    return app.widgets
      .map((widgetType) => {
        return widgetType.presets.map((preset) => {
          return {
            ...preset,
            widget: {
              ...preset.widget,
              type: widgetType.type,
            },
          };
        });
      })
      .flat();
  }, [app]);
}
