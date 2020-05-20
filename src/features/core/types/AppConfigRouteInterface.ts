import { ComponentType } from "react";

export interface AppConfigRouteInterface {
  path: string;
  component: () => Promise<{ default: ComponentType<any> }>;
  props?: any;
}
