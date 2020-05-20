import {
  DashboardInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  UserInterface,
  RoleInterface,
  WidgetInterface,
  SourceInterface,
} from "../../..";

export interface UserAdapterContextInterface {
  setLoading(value: boolean): void;
  setValidated(value: boolean): void;
  setOffline(value: boolean): void;

  setCurrentUser(user: UserInterface): void;

  setUsers(users: Array<UserInterface>): void;
  updateUsers(id: string, user: UserInterface): void;

  setRoles(roles: Array<RoleInterface>): void;
  updateRoles(id: string, role: RoleInterface): void;

  setSources(sources: Array<SourceInterface>): void;
  updateSources(id: string, source: SourceInterface): void;

  setDashboards(dashboards: Array<DashboardInterface>): void;
  updateDashboard(id: string, dashboard: DashboardInterface): void;

  setNavigationGroups(fes: Array<NavigationGroupInterface>): void;
  updateNavigationGroup(id: string, fe: NavigationGroupInterface): void;

  setNavigationItems(fes: Array<NavigationItemInterface>): void;
  updateNavigationItem(id: string, fe: NavigationItemInterface): void;

  setWidgets(widgets: Array<WidgetInterface>): void;
  updateWidget(id: string, widget: WidgetInterface): void;

  setUserData(userdata: Object): void;
  updateUserData(key: string, value: string): void;
}
