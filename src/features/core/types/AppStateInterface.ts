import {
  DataFetchingOptionsInterface,
  SourceInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  AlarmInterface,
  AlarmWebhookInterface,
} from "../../..";

export interface AppStateInterface {
  sources: {
    current: SourceInterface;
    all: SourceInterface[];
  };
  dashboards: {
    alarms: AlarmInterface[];
    alarmWebhooks: AlarmWebhookInterface[];

    linkedItem: string | undefined;
    linkedHistory: DataFetchingOptionsInterface;
  };
  navigation: {
    userNavigationGroups: NavigationGroupInterface[];
    userNavigationItems: NavigationItemInterface[];
  };
  ui: {
    sidebar: {
      open: boolean;
      visible: boolean;
    };
  };
}
