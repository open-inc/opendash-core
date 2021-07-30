import produce from "immer";

type Selector<T, ReturnType> = (state: T) => ReturnType;
type SubscriptionCallback<U> = (selection: U) => void;
type ProducerCallback<T> = (currentState: T) => T | void;

interface StoreCacheHandler {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
}

interface StoreConfig<T> {
  cacheHandler: StoreCacheHandler | null;
  cacheKey: string | null;
  cacheAllowlist: string[];
  cacheBlocklist: string[];
}

export class Store<T = {}> {
  private _state: T;
  private watcher = new Set<SubscriptionCallback<T>>();
  private selectorCache = new Map<Selector<T, any>, any>();
  private config: StoreConfig<T>;

  constructor(initialState: T, config?: Partial<StoreConfig<T>>) {
    this._state = initialState;

    this.config = {
      cacheHandler: config?.cacheHandler || null,
      cacheKey: config?.cacheKey || null,
      cacheAllowlist: config?.cacheAllowlist || null,
      cacheBlocklist: config?.cacheBlocklist || null,
    };

    this.readCache();
  }

  getState(): T {
    return this._state;
  }

  select<ReturnType>(selector: Selector<T, ReturnType>): ReturnType {
    return selector(this._state);
  }

  setState(state: T) {
    this._state = state;

    this.watcher.forEach((callback) => {
      try {
        callback(this._state);
      } catch (error) {
        console.error("Error in Store subscription callback:", error);
      }
    });

    this.writeCache();
  }

  update(callbackOrState: T | ProducerCallback<T>): void {
    if (typeof callbackOrState === "function") {
      this.setState(
        produce(this._state, callbackOrState as ProducerCallback<T>) as T
      );
    } else {
      this.setState(callbackOrState);
    }
  }

  assignToState(state: T) {
    this.setState(Object.assign({}, this._state, state));
  }

  subscribe(callback: SubscriptionCallback<T>) {
    this.watcher.add(callback);

    return () => {
      this.watcher.delete(callback);
    };
  }

  subscribeSelection<U = any>(
    selector: Selector<T, U>,
    callback: SubscriptionCallback<U>
  ) {
    const selectorCallback = () => {
      const cache = this.selectorCache.get(selector);
      const selection = selector(this._state);

      if (!cache || cache !== selection) {
        this.selectorCache.set(selector, selection);

        callback(selection);
      }
    };

    this.watcher.add(selectorCallback);

    return () => {
      this.watcher.delete(selectorCallback);
      this.selectorCache.delete(selector);
    };
  }

  private async readCache() {
    if (this.config.cacheHandler && this.config.cacheKey) {
      try {
        const handler = this.config.cacheHandler;
        const key = `store:cache:${this.config.cacheKey}`;

        let cache = await handler.get(key);

        cache = this.handleCacheLists(cache);

        this.assignToState(cache);
      } catch (error) {
        console.error(`@opendash/store: Error while loading cache:`, error);
      }
    }
  }
  private async writeCache() {
    if (this.config.cacheHandler && this.config.cacheKey) {
      try {
        const handler = this.config.cacheHandler;
        const key = `store:cache:${this.config.cacheKey}`;

        const cache = this.handleCacheLists(this._state);

        await handler.set(key, cache);

        console.log(`@opendash/store: Cached '${key}':`, cache);
      } catch (error) {
        console.error(`@opendash/store: Error while writing cache:`, error);
      }
    }
  }

  private handleCacheLists(state: T) {
    const result = { ...state };

    if (
      Array.isArray(this.config.cacheAllowlist) &&
      this.config.cacheAllowlist.length > 0
    ) {
      for (const key of Object.keys(result)) {
        if (!this.config.cacheAllowlist.includes(key)) {
          delete result[key];
        }
      }
    }

    if (
      Array.isArray(this.config.cacheBlocklist) &&
      this.config.cacheBlocklist.length > 0
    ) {
      for (const key of Object.keys(result)) {
        if (this.config.cacheBlocklist.includes(key)) {
          delete result[key];
        }
      }
    }

    return result;
  }
}
