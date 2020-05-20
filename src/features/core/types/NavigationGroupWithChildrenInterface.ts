import { NavigationGroupInterface, NavigationItemInterface } from "../../..";

export interface NavigationGroupWithChildrenInterface
  extends NavigationGroupInterface {
  children: NavigationItemInterface[];
}
