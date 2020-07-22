import * as React from "react";

import {
  WidgetContextInterface,
  WidgetBaseContextInterface,
  WidgetSettingsRenderWithSteps,
  WidgetSettingsRenderWithoutSteps,
} from "../../..";

export const WidgetSettingsRender = React.memo<{
  context: WidgetContextInterface;
  baseContext: WidgetBaseContextInterface;
}>(function WidgetSettingsRender(props) {
  const type = props.baseContext?.type;
  const hasSteps = type?.dataItems || type?.dataFetching;

  if (hasSteps) {
    return <WidgetSettingsRenderWithSteps {...props} />;
  } else {
    return <WidgetSettingsRenderWithoutSteps {...props} />;
  }
});
