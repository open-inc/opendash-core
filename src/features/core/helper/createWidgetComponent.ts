import * as React from "react";
import { WidgetContextInterface } from "../../..";

export function createWidgetComponent<T = any>(
  component: React.FunctionComponent<WidgetContextInterface<T>>
) {
  return React.memo(component);
}
