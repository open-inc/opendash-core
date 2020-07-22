import * as React from "react";

import {
  useWidgetType,
  useObjectState,
  WidgetComponentStateInterface,
  WidgetBaseContextInterface,
  WidgetConfigInterface,
  WidgetInterface,
} from "../../..";

export function useWidgetBaseContextDraftSetup(
  type: string,
  config: WidgetConfigInterface<any>,
  fullscreen: boolean = false
): WidgetBaseContextInterface {
  const id = undefined;

  const widget: WidgetInterface = React.useMemo(
    () => ({
      id,
      name: undefined,
      config,
      type,
    }),
    [type, config]
  );

  const widgetType = useWidgetType(widget?.type);
  const container = React.useRef<HTMLElement>();

  const [state, setState] = useObjectState<WidgetComponentStateInterface>({
    key: "" + Math.random(),
    name: null,
    loading: true,
    rename: false,
    delete: false,
    share: false,
    settings: false,
  });

  return React.useMemo(
    () => ({
      id,
      widget,
      type: widgetType,
      fullscreen,
      container,
      state,
      setState,
    }),
    [widget, widgetType, fullscreen, container, state, setState]
  );
}
