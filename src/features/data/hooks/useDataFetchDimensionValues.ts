import { useState } from "react";

import {
  useOpenDashServices,
  useDeepCompareEffect,
  DataItemInterface,
  DataFetchingOptionsInterface,
  DataItemDimensionValueInterface,
} from "../../..";

export function useDataFetchDimensionValues(
  itemOrItems: [DataItemInterface, number] | [DataItemInterface, number][],
  options: DataFetchingOptionsInterface,
  mapper?: undefined | null,
  onLiveValue?: (
    item: DataItemInterface,
    dimension: number,
    value: DataItemDimensionValueInterface,
    allItemsIndex: number,
    allItems: [DataItemInterface, number][]
  ) => void
): [DataItemInterface, number, DataItemDimensionValueInterface[]][];

export function useDataFetchDimensionValues<T>(
  itemOrItems: [DataItemInterface, number] | [DataItemInterface, number][],
  options: DataFetchingOptionsInterface,
  mapper: (
    result: [DataItemInterface, number, DataItemDimensionValueInterface[]][]
  ) => T,
  onLiveValue?: (
    item: DataItemInterface,
    dimension: number,
    value: DataItemDimensionValueInterface,
    allItemsIndex: number,
    allItems: [DataItemInterface, number][]
  ) => void
): T | undefined {
  const items: [DataItemInterface, number][] =
    (itemOrItems as [DataItemInterface, number])?.[0]?.source &&
    (itemOrItems as [DataItemInterface, number])?.[0]?.id &&
    Number.isInteger((itemOrItems as [DataItemInterface, number])?.[1])
      ? [itemOrItems as [DataItemInterface, number]]
      : (itemOrItems as [DataItemInterface, number][]);

  const { DataService } = useOpenDashServices();

  const [result, setResult] = useState<
    [DataItemInterface, number, DataItemDimensionValueInterface[]][]
  >([]);

  const [resultMapped, setResultMapped] = useState<T>();

  useDeepCompareEffect(() => {
    return DataService.fetchDimensionValuesMultiItemLive(
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
