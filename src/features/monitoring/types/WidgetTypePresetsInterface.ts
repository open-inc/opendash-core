import { WidgetConfigInterface } from "../../..";

export interface WidgetTypePresetsInterface<T = any> {
  label: string;
  description: string;
  imageLink: string;
  layout?: [number, number];
  widget: {
    config: Partial<WidgetConfigInterface<T>>;
  };
}
