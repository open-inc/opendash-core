import produce from "immer";

type Selector<T, ReturnType> = (state: T) => ReturnType;
type SubscriptionCallback<T> = () => void;
type ProducerCallback<T> = (currentState: T) => T | void;

export class Store<T> {
  private _state: T;
  private watcher = new Set<SubscriptionCallback<T>>();
  private selectorCache = new Map<Selector<T, any>, any>();

  constructor(initialState: T) {
    this._state = initialState;
  }

  state(): T {
    return this._state;
  }

  select<ReturnType>(selector: Selector<T, ReturnType>): ReturnType {
    return selector(this._state);
  }

  update(callbackOrState: T | ProducerCallback<T>): void {
    if (typeof callbackOrState === "function") {
      this._state = produce(
        this._state,
        callbackOrState as ProducerCallback<T>
      ) as T;
    } else {
      this._state = callbackOrState;
    }

    this.watcher.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error in Store subscription callback:", error);
      }
    });
  }

  subscribe(callback: SubscriptionCallback<T>) {
    this.watcher.add(callback);

    return () => {
      this.watcher.delete(callback);
    };
  }

  subscribeSelection(
    selector: Selector<T, any>,
    callback: SubscriptionCallback<T>
  ) {
    const selectorCallback = () => {
      const cache = this.selectorCache.get(selector);
      const selection = selector(this._state);

      if (!cache || cache !== selection) {
        this.selectorCache.set(selector, selection);

        callback();
      }
    };

    this.watcher.add(selectorCallback);

    return () => {
      this.watcher.delete(selectorCallback);
      this.selectorCache.delete(selector);
    };
  }
}
