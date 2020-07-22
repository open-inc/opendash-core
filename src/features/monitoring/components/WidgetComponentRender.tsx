import * as React from "react";

import {
  WidgetBaseContextInterface,
  useWidgetContextSetup,
  WidgetContextInterface,
} from "../../..";

export const WidgetComponentRender = React.memo<{
  baseContext: WidgetBaseContextInterface;
  context?: WidgetContextInterface;
}>(function WidgetComponentRender({ baseContext, context: injectedContext }) {
  const internalContext = useWidgetContextSetup(
    injectedContext ? null : baseContext
  );
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

  if (baseContext?.state.settings) {
    return null;
  }

  return <DisplayComponent {...context} />;
});
