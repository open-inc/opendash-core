import {
  WidgetTypePresetsInterface,
  WidgetComponentInterface,
  DataItemSelectionInterface,
  DataFetchingSelectionInterface,
  WidgetConfigInterface,
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

  dataFetching?: DataFetchingSelectionInterface;

  dataExplorer?: {
    title: string;
    description: string;
    icon: string;
    config: Partial<WidgetConfigInterface<T>>;
  };
}
