import {
  UserInterface,
  RoleInterface,
  DashboardInterface,
  WidgetInterface,
  DataFetchingOptionsInterface,
  SourceInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
} from "../../..";

export interface AppStateInterface {
  user: {
    current: UserInterface;
    offline: boolean;
    validated: boolean;
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

    currentDashboard: string | undefined;
    linkedItem: string | undefined;
    linkedHistory: DataFetchingOptionsInterface;
  };
  navigation: {
    userNavigationGroups: NavigationGroupInterface[];
    userNavigationItems: NavigationItemInterface[];
  };
}
