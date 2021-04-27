import * as React from "react";

import {
  WidgetContext,
  useWidgetContextSetup,
  WidgetContextInterface,
  createInternalComponent,
} from "../../..";

export const WidgetComponentRender = createInternalComponent<{
  baseContext: WidgetContext;
  context?: WidgetContextInterface;
}>(function WidgetComponentRender({ baseContext, context: injectedContext }) {
  const internalContext = useWidgetContextSetup(baseContext);
  const context = injectedContext || internalContext;

  const DisplayComponent = React.useMemo(
    () =>
      baseContext?.type?.displayComponent
        ? React.lazy(baseContext?.type.displayComponent)
        : null,
    [baseContext?.type?.displayComponent]
  );

  if (!baseContext?.widget) {
    console.warn(`WidgetSettingsModal: widget "${baseContext?.id}" not found.`);
    return null;
  }

  if (baseContext?.widget && !baseContext?.type) {
    console.warn(
      `WidgetComponent: type "${baseContext?.widget.type}" not found.`
    );
    return null;
  }

  if (baseContext?.store.getState().settings) {
    return null;
  }

  return <DisplayComponent {...context} />;
});
