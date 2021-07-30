import { equals, ServicesInterface, Store } from "../../..";

type SubscriptionCallback = () => void;

interface StoreCacheHandler {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
}

interface BaseServiceConfig<T> {
  initialState: T;

  cacheHandler?: StoreCacheHandler;
  cacheKey?: string;
  cacheAllowlist?: string[];
  cacheBlocklist?: string[];
}

export class BaseService<T = any> {
  private enabled: boolean = false;
  private loading: boolean = true;

  private subscribers = new Set<SubscriptionCallback>();

  public store: Store<T>;

  constructor(config: BaseServiceConfig<T>) {
    this.store = new Store(config.initialState, {
      cacheHandler: config.cacheHandler,
      cacheKey: config.cacheKey,
      cacheAllowlist: config.cacheAllowlist,
      cacheBlocklist: config.cacheBlocklist,
    });
  }

  public isEnabled() {
    return this.enabled;
  }

  public isLoading() {
    return this.loading;
  }

  public wait(): Promise<void> {
    if (!this.loading) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const unsubscribe = this.subscribe(() => {
        resolve();
        unsubscribe();
      });
    });
  }

  public subscribe(callback: SubscriptionCallback): () => void {
    this.subscribers.add(callback);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  public setLoading(value: boolean) {
    this.loading = value;
    this.notifySubscribers();
  }

  public notifySubscribers(): void {
    this.subscribers.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error in service subscription:", error);
      }
    });
  }

  public clearSubscribers(): void {
    this.subscribers.clear();
  }

  protected initAdapter(
    adapter: any,
    context: any,
    services: ServicesInterface
  ) {
    if (!adapter) {
      return;
    }

    this.enabled = true;

    adapter.onContext(context);

    if (adapter.onUser) {
      let current = undefined;

      const updateUserOnChange = () => {
        if (!services.UserService.isLoading()) {
          if (!equals(current, services.UserService.currentUser())) {
            current = services.UserService.currentUser();
            adapter.onUser(current);
          }
        }
      };

      updateUserOnChange();

      services.UserService.subscribe(() => {
        updateUserOnChange();
      });
    }

    if (adapter.onSource) {
      let current = undefined;
      let descendentsIds: string[] = [];

      const updateSourceOnChange = () => {
        if (!services.SourceService.isLoading()) {
          const localCurrent = services.SourceService.getCurrent();
          const localDescendents =
            services.SourceService.getDescendents(localCurrent);
          const localDescendentsIds = localDescendents.map(
            (source) => source.id
          );

          if (
            !equals(current, localCurrent) ||
            !equals(descendentsIds, localDescendentsIds)
          ) {
            current = localCurrent;
            descendentsIds = localDescendentsIds;
            adapter.onSource(localCurrent, localDescendents);
          }
        }
      };

      updateSourceOnChange();

      services.SourceService.subscribe(() => {
        updateSourceOnChange();
      });
    }
  }
}
