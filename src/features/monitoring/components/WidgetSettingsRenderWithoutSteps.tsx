import * as React from "react";

import { WidgetContextInterface, WidgetBaseContextInterface } from "../../..";

export const WidgetSettingsRenderWithoutSteps = React.memo<{
  context: WidgetContextInterface;
  baseContext: WidgetBaseContextInterface;
}>(function WidgetSettingsRenderWithoutSteps({ context, baseContext }) {
  const SettingsComponent = React.useMemo(
    () =>
      baseContext?.type?.settingsComponent
        ? React.lazy(baseContext.type.settingsComponent)
        : null,
    [baseContext?.type?.settingsComponent]
  );

  return <SettingsComponent {...context} />;
});
