import {
  SourceInterface,
  WidgetConfigInterface,
  DataItemInterface,
  DataFetchingOptionsInterface,
  DataItemValueInterface,
  DataItemDimensionValueInterface,
} from "../../..";

export interface WidgetContextInterface<T = any> {
  config: WidgetConfigInterface<T>;
  draft: WidgetConfigInterface<T>;
  savedConfig: WidgetConfigInterface<T>;
  unsaved: boolean;
  updateDraft: (
    f: (draft: WidgetConfigInterface<T>) => void | WidgetConfigInterface<T>
  ) => void;
  replaceDraft: (replacement: WidgetConfigInterface<T>) => void;
  assignToDraft: (objectToAssign: Partial<WidgetConfigInterface<T>>) => void;
  saveDraft: () => void;
  setLoading: (loading: boolean) => void;
  useContainerSize: () => {
    width: number;
    height: number;
  };
  useSourceConfig: () => SourceInterface[];
  useItemConfig: () => DataItemInterface[];
  useItemDimensionConfig: () => [DataItemInterface, number][];

  useFetchConfig: (
    overwriteOptions?: DataFetchingOptionsInterface
  ) => DataFetchingOptionsInterface;

  useFetchValues(
    overwriteOptions?: DataFetchingOptionsInterface,
    mapper?: undefined | null,
    onLiveValue?: (
      item: DataItemInterface,
      value: DataItemValueInterface,
      allItemsIndex: number,
      allItems: DataItemInterface[]
    ) => void
  ): [DataItemInterface, DataItemValueInterface[]][];

  useFetchValues<T>(
    overwriteOptions: DataFetchingOptionsInterface,
    mapper: (result: [DataItemInterface, DataItemValueInterface[]][]) => T,
    onLiveValue?: (
      item: DataItemInterface,
      value: DataItemValueInterface,
      allItemsIndex: number,
      allItems: DataItemInterface[]
    ) => void
  ): T | undefined;

  useFetchDimensionValues(
    overwriteOptions?: DataFetchingOptionsInterface,
    mapper?: undefined | null,
    onLiveValue?: (
      item: DataItemInterface,
      dimension: number,
      value: DataItemDimensionValueInterface,
      allItemsIndex: number,
      allItems: [DataItemInterface, number][]
    ) => void
  ): [DataItemInterface, number, DataItemDimensionValueInterface[]][];

  useFetchDimensionValues<T>(
    overwriteOptions: DataFetchingOptionsInterface,
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
  ): T | undefined;
}
