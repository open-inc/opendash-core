import { AppFactory } from "../../..";

export interface AppPluginInterface {
  name: string;
  onFactory: (factory: AppFactory) => Promise<void> | void;
}
