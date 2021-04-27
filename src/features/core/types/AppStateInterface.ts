import {
  UserInterface,
  RoleInterface,
  DashboardInterface,
  WidgetInterface,
  DataFetchingOptionsInterface,
  SourceInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  AlarmInterface,
  AlarmWebhookInterface,
} from "../../..";

export interface AppStateInterface {
  user: {
    current: UserInterface;
    offline: boolean;
    validated: boolean;
    permissions: string[];
  };
  collaboration: {
    users: UserInterface[];
    roles: RoleInterface[];
  };
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
