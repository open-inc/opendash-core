import {
  DataFetchingOptionsInterface,
  SourceInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
} from "../../..";

export interface AppStateInterface {
  sources: {
    current: SourceInterface;
    all: SourceInterface[];
  };
  dashboards: {
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
