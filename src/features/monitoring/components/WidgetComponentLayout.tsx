import * as React from "react";

import {
  WidgetComponentLayoutDefault,
  WidgetBaseContextInterface,
} from "../../..";

interface Props extends WidgetBaseContextInterface {
  layout: string;
}

export const WidgetComponentLayout = React.memo<React.PropsWithChildren<Props>>(
  function WidgetComponentLayoutComponent({ layout, children, ...props }) {
    switch (layout) {
      case "default":
        return <WidgetComponentLayoutDefault {...props} children={children} />;

      default:
        return null;
    }
  }
);
