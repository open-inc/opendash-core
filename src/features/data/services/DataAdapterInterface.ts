import {
  BaseAdapterInterface,
  DataAdapterContext,
  DataItemInterface,
  DataItemValueInterface,
  DataFetchingOptionsInterface,
  DataItemDimensionValueInterface,
} from "../../..";

export interface DataAdapterInterface extends BaseAdapterInterface {
  onContext(context: DataAdapterContext);

  fetchValues(
    item: DataItemInterface,
    options: DataFetchingOptionsInterface
  ): Promise<DataItemValueInterface[]>;

  fetchDimensionValues(
    item: DataItemInterface,
    dimension: number,
    options: DataFetchingOptionsInterface
  ): Promise<DataItemDimensionValueInterface[]>;

  update(item: DataItemInterface): Promise<void>;
}
