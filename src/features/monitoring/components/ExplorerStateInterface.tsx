import {
  DataItemDimensionIdentifierInterface,
  DataFetchingOptionsInterface,
} from "../../..";

export interface ExplorerStateInterface {
  step: number;
  dataType: string;
  itemDimensions: DataItemDimensionIdentifierInterface[];
  fetchingOptions: DataFetchingOptionsInterface;
  visualisation: string;
}
