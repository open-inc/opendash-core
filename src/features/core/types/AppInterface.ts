import {
  AppStateInterface,
  AppRefsInterface,
  AppConfigRouteInterface,
  ServicesInterface,
  WidgetTypeInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  Store,
} from "../../..";

export interface AppInterface {
  id: string;
  ui: {
    refs: AppRefsInterface;

    disableHeader: boolean;
    disableFooter: boolean;
    logoImage: string;
    logoText: string;
    logoLink: string;
    logoLinkExternal: boolean;

    languages: { key: string; label: string; fallback: string }[];
    staticNavigationGroups: NavigationGroupInterface[];
    staticNavigationItems: NavigationItemInterface[];
  };
  routes: AppConfigRouteInterface[];
  widgets: WidgetTypeInterface[];
  state: Store<AppStateInterface>;
  services: ServicesInterface;
}
