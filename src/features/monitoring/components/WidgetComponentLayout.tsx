import * as React from "react";

import {
  createInternalComponent,
  WidgetComponentLayoutDefault,
  WidgetComponentLayoutFullscreen,
  WidgetContext,
} from "../../..";

interface Props {
  layout: string;
  context: WidgetContext;
}

export const WidgetComponentLayout = createInternalComponent<
  React.PropsWithChildren<Props>
>(function WidgetComponentLayout({ layout, children, context }) {
  switch (layout) {
    case "default":
      return (
        <WidgetComponentLayoutDefault context={context} children={children} />
      );

    case "fullscreen":
      return (
        <WidgetComponentLayoutFullscreen
          context={context}
          children={children}
        />
      );

    default:
      return null;
  }
});
