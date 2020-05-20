import { StorageService, AppInterface } from "../../..";

export class StorageAdapterContext {
  private service: StorageService;
  private storage: Map<string, any>;

  constructor(
    storage: Map<string, string>,
    service: StorageService,
    app: AppInterface
  ) {
    this.storage = storage;
    this.service = service;
  }

  setLoading(value: boolean): void {
    this.service.setLoading(value);
  }

  set(key: string, value: string): void {
    this.storage.set(key, value);
    this.service.notifySubscribers();
  }

  delete(key: string): void {
    this.storage.delete(key);
    this.service.notifySubscribers();
  }

  clear(): void {
    this.storage.clear();
    this.service.notifySubscribers();
  }
}
