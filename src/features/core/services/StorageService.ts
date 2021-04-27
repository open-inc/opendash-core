import {
  AppInterface,
  ServicesInterface,
  BaseService,
  StorageAdapterInterface,
  StorageAdapterContext,
  StorageOptionsInterface,
} from "../../..";

export class StorageService extends BaseService {
  private app: AppInterface;
  private services: ServicesInterface;
  private adapter: StorageAdapterInterface;
  private context: StorageAdapterContext;

  private storage = new Map<string, string>();
  private cache = new Map<string, any>();

  constructor(app: AppInterface, adapter: StorageAdapterInterface) {
    super({
      initialState: {},
    });

    this.app = app;
    this.services = app.services;
    this.adapter = adapter;
    this.context = new StorageAdapterContext(this.storage, this, app);

    this.initAdapter(adapter, this.context, this.services);
  }

  public async get<T>(key: string): Promise<T> {
    return this._getSync(key);
  }

  public async set<T>(
    key: string,
    value: T,
    options?: StorageOptionsInterface<T>
  ) {
    const nextValue = options?.encode
      ? options.encode(value)
      : JSON.stringify(value);

    if (this.storage.has(key) && this.storage.get(key) === nextValue) {
      return;
    }

    this.cache.delete(key);

    return await this.adapter.set(key, nextValue);
  }

  public async delete(key: string) {
    return await this.adapter.delete(key);
  }

  public async keys(): Promise<string[]> {
    return this._keysSync();
  }

  public async clear(): Promise<void> {
    return await this.adapter.clear();
  }

  public _getSync<T>(key: string, options?: StorageOptionsInterface<T>): T {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (this.storage.has(key)) {
      const cache = options?.decode
        ? options.decode(this.storage.get(key))
        : JSON.parse(this.storage.get(key));

      this.cache.set(key, cache);

      return cache;
    }

    return undefined;
  }

  public _keysSync(): string[] {
    return Array.from(this.storage.keys());
  }
}
