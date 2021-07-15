import {
  AppStateInterface,
  AppRefsInterface,
  AppConfigRouteInterface,
  ServicesInterface,
  WidgetTypeInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  AuthFormComponentInterface,
  Store,
} from "../../..";

export interface AppInterface {
  id: string;
  ui: {
    refs: AppRefsInterface;

    authLoginForm: AuthFormComponentInterface;
    authSignupForm: AuthFormComponentInterface;

    disableHeader: boolean;
    disableHeaderSourcePicker: boolean;
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

  _internal: {
    globalComponents: [React.ComponentType, any][];
    providerComponents: [React.ComponentType, any][];
  };
}
