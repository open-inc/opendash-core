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
    dashboards: DashboardInterface[];
    widgets: WidgetInterface[];
    alarms: AlarmInterface[];
    alarmWebhooks: AlarmWebhookInterface[];

    currentDashboard: string | undefined;
    linkedItem: string | undefined;
    linkedHistory: DataFetchingOptionsInterface;
  };
  navigation: {
    userNavigationGroups: NavigationGroupInterface[];
    userNavigationItems: NavigationItemInterface[];
  };
}
