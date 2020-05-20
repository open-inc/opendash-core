import { useState } from "react";

import {
  useOpenDashServices,
  useDeepCompareEffect,
  DataItemInterface,
  DataFetchingOptionsInterface,
  DataItemValueInterface,
} from "../../..";

export function useDataFetchValues(
  itemOrItems: DataItemInterface | DataItemInterface[],
  options: DataFetchingOptionsInterface,
  mapper?: undefined | null,
  onLiveValue?: (
    item: DataItemInterface,
    value: DataItemValueInterface,
    allItemsIndex: number,
    allItems: DataItemInterface[]
  ) => void
): [DataItemInterface, DataItemValueInterface[]][];

export function useDataFetchValues<T>(
  itemOrItems: DataItemInterface | DataItemInterface[],
  options: DataFetchingOptionsInterface,
  mapper: (result: [DataItemInterface, DataItemValueInterface[]][]) => T,
  onLiveValue?: (
    item: DataItemInterface,
    value: DataItemValueInterface,
    allItemsIndex: number,
    allItems: DataItemInterface[]
  ) => void
): T | undefined {
  const items: DataItemInterface[] =
    (itemOrItems as DataItemInterface)?.source &&
    (itemOrItems as DataItemInterface)?.id
      ? [itemOrItems as DataItemInterface]
      : (itemOrItems as DataItemInterface[]);

  const { DataService } = useOpenDashServices();

  const [result, setResult] = useState<
    [DataItemInterface, DataItemValueInterface[]][]
  >([]);
  const [resultMapped, setResultMapped] = useState<T>();

  useDeepCompareEffect(() => {
    return DataService.fetchValuesMultiItemLive(
      items,
      options,
      (value) => {
        if (mapper) {
          setResultMapped(mapper(value));
        } else {
          setResult(value);
        }
      },
      onLiveValue
    );
  }, [items, options]);

  if (mapper) {
    return resultMapped;
  } else {
    // TODO: Why is this a TS Error?
    // @ts-ignore
    return result;
  }
}
