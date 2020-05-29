import * as React from "react";

import {
  useWidget,
  useWidgetType,
  useObjectState,
  WidgetComponentStateInterface,
  WidgetBaseContextInterface,
} from "../../..";

export function useWidgetBaseContextSetup(
  id: string,
  fullscreen: boolean = false
): WidgetBaseContextInterface {
  const widget = useWidget(id);
  const type = useWidgetType(widget?.type);
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
    () => ({ id, widget, type, fullscreen, container, state, setState }),
    [id, widget, type, fullscreen, container, state, setState]
  );
}
