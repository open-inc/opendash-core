import {
  WidgetInterface,
  WidgetTypeInterface,
  WidgetComponentStateInterface,
} from "../../..";

export interface WidgetBaseContextInterface {
  id: string;
  widget: WidgetInterface;
  type: WidgetTypeInterface;
  fullscreen: boolean;
  container: React.MutableRefObject<any>;
  state: WidgetComponentStateInterface;
  setState: (value: Partial<WidgetComponentStateInterface>) => void;
}
