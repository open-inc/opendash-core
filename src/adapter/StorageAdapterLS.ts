import { StorageAdapterInterface, StorageAdapterContext } from "..";

interface AdapterOptions {
  scope: string;
}

const DIVIDER = "/";

export class StorageAdapterLS implements StorageAdapterInterface {
  private context: StorageAdapterContext;

  private options: AdapterOptions = {
    scope: "opendash",
  };

  constructor(options?: Partial<AdapterOptions>) {
    if (options) {
      this.options = Object.assign({}, this.options, options);
    }
  }

  onContext(context: StorageAdapterContext) {
    this.context = context;

    this.init();
  }

  private async init() {
    this.context.clear();

    for (const key in localStorage) {
      if (key.startsWith(this.options.scope + DIVIDER)) {
        this.context.set(
          key.replace(this.options.scope + DIVIDER, ""),
          window.localStorage.getItem(key)
        );
      }
    }

    this.context.setLoading(false);
  }

  public async set(key: string, value: any): Promise<void> {
    window.localStorage.setItem(this.options.scope + DIVIDER + key, value);
    this.context.set(key, value);
  }

  public async delete(key: string): Promise<void> {
    window.localStorage.removeItem(this.options.scope + DIVIDER + key);
    this.context.delete(key);
  }

  public async clear(): Promise<void> {
    window.localStorage.clear();
    this.context.clear();
  }
}
