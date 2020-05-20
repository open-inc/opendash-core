import { NavigationPlaceInterface } from "../../..";

export interface NavigationItemInterface {
  id: string;
  group: string;
  place: NavigationPlaceInterface;
  order: number;

  label: string;
  icon?: string;
  color?: string;

  link?: string;
  event?: string;

  routeCondition: string | string[];
  activeCondition: string | string[];
}
