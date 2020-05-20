import {
  WidgetTypePresetsInterface,
  WidgetComponentInterface,
  DataItemSelectionInterface,
  DataFetchingSelectionInterface,
} from "../../..";

export interface WidgetTypeInterface<T = any> {
  type: string;
  displayComponent: () => Promise<{ default: WidgetComponentInterface }>;
  settingsComponent: () => Promise<{
    default: WidgetComponentInterface;
  }>;
  meta?: {
    linkedData?: boolean;
    linkedHistory?: boolean;
  };
  presets: WidgetTypePresetsInterface<T>[];

  dataVisualisation?: boolean;

  dataItems?: DataItemSelectionInterface;

  dataHistory?: DataFetchingSelectionInterface;
}
