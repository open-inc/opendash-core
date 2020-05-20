import {
  BaseAdapterInterface,
  NavigationAdapterContext,
  NavigationGroupInterface,
  NavigationItemInterface,
} from "../../..";

export interface NavigationAdapterInterface extends BaseAdapterInterface {
  onContext(context: NavigationAdapterContext);

  createNavigationGroup(fe: NavigationGroupInterface): Promise<string>;
  updateNavigationGroup(fe: NavigationGroupInterface): Promise<void>;
  deleteNavigationGroup(fe: NavigationGroupInterface): Promise<void>;

  createNavigationItem(fe: NavigationItemInterface): Promise<string>;
  updateNavigationItem(fe: NavigationItemInterface): Promise<void>;
  deleteNavigationItem(fe: NavigationItemInterface): Promise<void>;
}
