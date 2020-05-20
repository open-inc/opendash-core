import { BaseAdapterInterface, StorageAdapterContext } from "../../..";

export interface StorageAdapterInterface extends BaseAdapterInterface {
  onContext(context: StorageAdapterContext);

  // get(key: string): Promise<any>;
  // keys(): Promise<string[]>;
  set(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
