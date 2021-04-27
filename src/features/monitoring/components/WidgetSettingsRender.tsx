import * as React from "react";

import {
  WidgetContextInterface,
  WidgetSettingsRenderWithSteps,
  WidgetSettingsRenderWithoutSteps,
  createInternalComponent,
} from "../../..";

export const WidgetSettingsRender = createInternalComponent<{
  context: WidgetContextInterface;
}>(function WidgetSettingsRender(props) {
  const type = props.context.context.type;
  const hasSteps = type?.dataItems || type?.dataFetching;

  if (hasSteps) {
    return <WidgetSettingsRenderWithSteps {...props} />;
  } else {
    return <WidgetSettingsRenderWithoutSteps {...props} />;
  }
});
