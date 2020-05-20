import { WidgetTypeInterface } from "../../..";

export function createWidget<T = any>(widget: WidgetTypeInterface<T>) {
  return widget;
}
