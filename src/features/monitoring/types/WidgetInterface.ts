import { WidgetConfigInterface } from "../../..";

export interface WidgetInterface<T = any> {
  id: string;
  name: string;
  type: string;
  config: WidgetConfigInterface<T>;

  isOwner?: boolean;
  isShared?: boolean;
  isReadOnly?: boolean;
}
