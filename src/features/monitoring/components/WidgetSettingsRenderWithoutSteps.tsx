import * as React from "react";

import {
  WidgetContextInterface,
  WidgetContext,
  createInternalComponent,
} from "../../..";

export const WidgetSettingsRenderWithoutSteps = createInternalComponent<{
  context: WidgetContextInterface;
}>(function WidgetSettingsRenderWithoutSteps({ context }) {
  const SettingsComponent = React.useMemo(
    () =>
      context.context?.type?.settingsComponent
        ? React.lazy(context.context.type.settingsComponent)
        : null,
    [context.context?.type?.settingsComponent]
  );

  if (!SettingsComponent) {
    return null;
  }

  return <SettingsComponent {...context} />;
});
