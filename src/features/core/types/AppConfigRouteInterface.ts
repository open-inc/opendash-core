import { ComponentType } from "react";

export type AppConfigRouteInterface =
  | {
      path: string;
      component: () => Promise<{ default: ComponentType<any> }>;
      props?: any;
    }
  | {
      path: string;
      redirectPath: string;
    };
