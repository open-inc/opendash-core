import {
  DataItemDimensionSelectionInterface,
  DataItemSelectionInterface,
  DataSourceSelectionInterface,
} from "../../..";

export type DataSelectionInterface =
  | DataSourceSelectionInterface
  | DataItemSelectionInterface
  | DataItemDimensionSelectionInterface;
