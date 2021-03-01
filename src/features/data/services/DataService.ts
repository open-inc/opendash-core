import produce from "immer";

import {
  AppInterface,
  ServicesInterface,
  BaseService,
  DataAdapterInterface,
  DataAdapterContext,
  DataItemInterface,
  DataItemValueInterface,
  equals,
  DataFetchingOptionsInterface,
  DataItemIdentifierInterface,
  DataItemDimensionValueInterface,
  evaluateDataFetchingOptions,
  stringToColor,
} from "../../..";

type SubscriptionCallback = () => void;
type SubCancelCB = () => void;

export class DataService extends BaseService {
  private app: AppInterface;
  private services: ServicesInterface;
  private adapter: DataAdapterInterface;
  private context: DataAdapterContext;

  private itemStore = new Map<string, DataItemInterface>();
  private itemSubscriptions = new Map<string, Set<SubscriptionCallback>>();
  private itemListSubscriptions: Set<SubscriptionCallback> = new Set();
  private valueStore = new Map<string, DataItemValueInterface>();
  private valueSubscriptions = new Map<string, Set<SubscriptionCallback>>();

  constructor(app: AppInterface, adapter: DataAdapterInterface) {
    super();

    this.app = app;
    this.services = app.services;
    this.adapter = adapter;
    this.context = new DataAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, this.services);
  }

  private notifyDataSubscribers(
    subscribers: Set<SubscriptionCallback>,
    clear: boolean = false
  ): void {
    subscribers.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error in subscription:", error);
      }
    });

    if (clear) {
      subscribers.clear();
    }
  }

  public subscribeItemList(callback: SubscriptionCallback): SubCancelCB {
    this.itemListSubscriptions.add(callback);

    return () => {
      this.itemListSubscriptions.delete(callback);
    };
  }

  public subscribeItem(
    item: DataItemInterface,
    callback: SubscriptionCallback
  ): SubCancelCB {
    const key = keyForItem(item);

    if (!this.itemSubscriptions.has(key)) {
      this.itemSubscriptions.set(key, new Set());
    }

    this.itemSubscriptions.get(key).add(callback);

    return () => {
      this.itemSubscriptions.get(key).delete(callback);
    };
  }

  public subscribeValue(
    item: DataItemInterface,
    callback: SubscriptionCallback
  ): SubCancelCB {
    const key = keyForItem(item);

    if (!this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.set(key, new Set());
    }

    this.valueSubscriptions.get(key).add(callback);

    return () => {
      this.valueSubscriptions.get(key).delete(callback);
    };
  }

  public async get(source: string, id: string): Promise<DataItemInterface> {
    return this._getOrThrowSync(source, id);
  }

  public _getOrThrowSync(source: string, id: string): DataItemInterface {
    const item = this.itemStore.get(keyForIdentifier([source, id]));

    if (!item) {
      throw new Error(`Item with id "${id}" not found`);
    }

    return item;
  }

  public async getValue(
    item: DataItemInterface
  ): Promise<DataItemValueInterface> {
    return this._getValueOrThrowSync(item);
  }

  public _getValueOrThrowSync(item: DataItemInterface): DataItemValueInterface {
    return this.valueStore.get(keyForItem(item));
  }

  public async list(): Promise<DataItemInterface[]> {
    return this._listOrThrowSync();
  }

  public _listOrThrowSync(): DataItemInterface[] {
    return Array.from(this.itemStore.values());
  }

  public async setItem(item: DataItemInterface): Promise<void> {
    const key = keyForItem(item);

    if (!this.itemSubscriptions.has(key)) {
      this.itemSubscriptions.set(key, new Set());
    }

    if (!this.itemStore.has(key) || !equals(this.itemStore.get(key), item)) {
      this.itemStore.set(key, item);

      this.notifyDataSubscribers(this.itemListSubscriptions);
      this.notifyDataSubscribers(this.itemSubscriptions.get(key));
    }
  }

  public async setItems(items: DataItemInterface[]): Promise<void> {
    let hasChanges = false;

    for (const item of items) {
      const key = keyForItem(item);

      if (!this.itemSubscriptions.has(key)) {
        this.itemSubscriptions.set(key, new Set());
      }

      if (!this.itemStore.has(key) || !equals(this.itemStore.get(key), item)) {
        hasChanges = true;

        this.itemStore.set(key, item);

        this.notifyDataSubscribers(this.itemSubscriptions.get(key));
      }
    }

    if (hasChanges) {
      this.notifyDataSubscribers(this.itemListSubscriptions);
    }
  }

  public async setValue(
    item: DataItemInterface,
    value: DataItemValueInterface
  ): Promise<void> {
    const key = keyForItem(item);

    if (!this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.set(key, new Set());
    }

    if (!this.valueStore.has(key) || !equals(this.valueStore.get(key), value)) {
      this.valueStore.set(key, value);

      this.notifyDataSubscribers(this.valueSubscriptions.get(key));
    }
  }

  public async removeItem(item: DataItemInterface): Promise<void> {
    const key = keyForItem(item);

    this.itemStore.delete(key);
    this.valueStore.delete(key);

    this.notifyDataSubscribers(this.itemListSubscriptions);
    this.notifyDataSubscribers(this.itemSubscriptions.get(key));
    this.notifyDataSubscribers(this.valueSubscriptions.get(key));
  }

  public async clear() {
    this.setLoading(true);

    // clear stores
    this.itemStore.clear();
    this.valueStore.clear();

    this.notifyDataSubscribers(this.itemListSubscriptions);

    Array.from(this.itemSubscriptions.keys()).forEach((key) => {
      this.notifyDataSubscribers(this.itemSubscriptions.get(key));
    });

    Array.from(this.valueSubscriptions.keys()).forEach((key) => {
      this.notifyDataSubscribers(this.valueSubscriptions.get(key));
    });
  }

  public async fetchValues(
    item: DataItemInterface,
    options: DataFetchingOptionsInterface
  ): Promise<DataItemValueInterface[]> {
    await this.wait();

    if (!options.historyType) {
      return [];
    }

    return await this.adapter.fetchValues(
      item,
      evaluateDataFetchingOptions(options)
    );
  }

  public async fetchValuesMultiItem(
    items: DataItemInterface[],
    options: DataFetchingOptionsInterface
  ): Promise<[DataItemInterface, DataItemValueInterface[]][]> {
    await this.wait();

    const historyRequests = items.map((item) =>
      this.fetchValues(item, options)
    );

    const histories = await Promise.all(historyRequests);

    const resultEntries = items.map(
      (item, i) =>
        [item, histories[i]] as [DataItemInterface, DataItemValueInterface[]]
    );

    return resultEntries;
  }

  public fetchValuesMultiItemLive(
    items: DataItemInterface[],
    options: DataFetchingOptionsInterface,
    callback: (value: [DataItemInterface, DataItemValueInterface[]][]) => void,
    onLiveValue?: (
      item: DataItemInterface,
      value: DataItemValueInterface,
      allItemsIndex: number,
      allItems: DataItemInterface[]
    ) => void
  ): SubCancelCB {
    let canceled = false;
    let cancleCallbacks = new Set<SubCancelCB>();

    this.fetchValuesMultiItem(items, options).then((fetchedValueHistory) => {
      let currentValueHistory = fetchedValueHistory;

      callback(currentValueHistory);

      if (options.live) {
        items.forEach((item, index, allItems) => {
          cancleCallbacks.add(
            this.subscribeValue(item, () => {
              const currentValue = this._getValueOrThrowSync(item);

              if (onLiveValue) {
                onLiveValue(item, currentValue, index, allItems);
              } else {
                currentValueHistory = produce(currentValueHistory, (draft) => {
                  for (const [draftItem, draftValues] of draft) {
                    if (
                      draftItem.source === item.source &&
                      draftItem.id === item.id
                    ) {
                      draftValues.push({
                        date: currentValue.date,
                        value: currentValue.value,
                      });

                      if (options.limit && options.limit < draftValues.length) {
                        draftValues.splice(
                          0,
                          draftValues.length - options.limit
                        );
                      }

                      break;
                    }
                  }
                });

                callback(currentValueHistory);
              }
            })
          );
        });
      }
    });

    return () => {
      canceled = true;
      cancleCallbacks.forEach((cb) => {
        cb();
      });
    };
  }

  public async fetchDimensionValues(
    item: DataItemInterface,
    dimension: number,
    options: DataFetchingOptionsInterface
  ): Promise<DataItemDimensionValueInterface[]> {
    await this.wait();

    if (!options.historyType) {
      return [];
    }

    return await this.adapter.fetchDimensionValues(
      item,
      dimension,
      evaluateDataFetchingOptions(options)
    );
  }

  public async fetchDimensionValuesMultiItem(
    items: [DataItemInterface, number][],
    options: DataFetchingOptionsInterface
  ): Promise<[DataItemInterface, number, DataItemDimensionValueInterface[]][]> {
    await this.wait();

    const historyRequests = items.map(([item, dimension]) =>
      this.fetchDimensionValues(item, dimension, options)
    );

    const histories = await Promise.all(historyRequests);

    const resultEntries = items.map(
      ([item, dimension], i) =>
        [item, dimension, histories[i]] as [
          DataItemInterface,
          number,
          DataItemDimensionValueInterface[]
        ]
    );

    return resultEntries;
  }

  public fetchDimensionValuesMultiItemLive(
    items: [DataItemInterface, number][],
    options: DataFetchingOptionsInterface,
    callback: (
      value: [DataItemInterface, number, DataItemDimensionValueInterface[]][]
    ) => void,
    onLiveValue?: (
      item: DataItemInterface,
      dimension: number,
      value: DataItemDimensionValueInterface,
      allItemsIndex: number,
      allItems: [DataItemInterface, number][]
    ) => void
  ): SubCancelCB {
    let canceled = false;
    let subscriber = new Set<SubCancelCB>();

    this.fetchDimensionValuesMultiItem(items, options).then(
      (fetchedValueHistory) => {
        let currentValueHistory = fetchedValueHistory;

        callback(currentValueHistory);

        if (options.live) {
          items.forEach(([item, dimension], index, allItems) => {
            subscriber.add(
              this.subscribeValue(item, () => {
                const currentValue = this._getValueOrThrowSync(item);

                if (onLiveValue) {
                  onLiveValue(
                    item,
                    dimension,
                    {
                      date: currentValue.date,
                      value: currentValue.value[dimension],
                    },
                    index,
                    allItems
                  );
                } else {
                  currentValueHistory = produce(
                    currentValueHistory,
                    (draft) => {
                      for (const [
                        draftItem,
                        draftDimension,
                        draftValues,
                      ] of draft) {
                        if (
                          draftItem.source === item.source &&
                          draftItem.id === item.id &&
                          draftDimension === dimension
                        ) {
                          draftValues.push({
                            date: currentValue.date,
                            value: currentValue.value[dimension],
                          });

                          if (
                            options.limit &&
                            options.limit < draftValues.length
                          ) {
                            draftValues.splice(
                              0,
                              draftValues.length - options.limit
                            );
                          }

                          break;
                        }
                      }
                    }
                  );

                  callback(currentValueHistory);
                }
              })
            );
          });
        }
      }
    );

    return () => {
      canceled = true;
      subscriber.forEach((cb) => {
        cb();
      });
    };
  }

  public getItemName(
    item: DataItemInterface,
    dimension?: number,
    dimensionOnly: boolean = false
  ): string {
    item = this._getOrThrowSync(item.source, item.id);

    const overwrites =
      this.app.services.UserStorageService._getSync(
        `opendash/data/names/${item.source}`
      ) || {};

    const itemName = overwrites[JSON.stringify([item.id])] || item.name;

    if (Number.isInteger(dimension)) {
      const dimName =
        overwrites[JSON.stringify([item.id, dimension])] ||
        item.valueTypes[dimension].name;

      if (dimensionOnly) {
        return dimName;
      }

      return `${itemName} (${dimName})`;
    }

    return item.name;
  }

  public async setItemName(item: DataItemInterface, name: string) {
    await this.setItemDimensionName(item, undefined, name);
  }

  public async setItemDimensionName(
    item: DataItemInterface,
    dimension,
    name: string
  ) {
    const { UserStorageService } = this.app.services;

    const storageKey = `opendash/data/names/${item.source}`;
    const itemKey = JSON.stringify(
      Number.isInteger(dimension) ? [item.id, dimension] : [item.id]
    );

    const overwrites = UserStorageService._getSync(storageKey) || {};

    const newOverwrites = produce(overwrites, (draft) => {
      draft[itemKey] = name;
    });

    await UserStorageService.set(storageKey, newOverwrites);
  }

  public async update(item: DataItemInterface): Promise<void> {
    return await this.adapter.update(item);
  }

  public getItemColor(item: DataItemInterface, dimension: number = 0): string {
    if (item.meta.color) {
      return item.meta.color;
    }

    return stringToColor(item.id + "-" + dimension);
  }
}

function keyForIdentifier(item: DataItemIdentifierInterface): string {
  return JSON.stringify(item);
}

function keyForItem(item: DataItemInterface): string {
  return JSON.stringify([item.source, item.id]);
}
