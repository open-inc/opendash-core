import {
  DataFetchingSelectionInterface,
  DataFetchingOptionsInterface,
} from "../../..";

export function fixDataFetchingSelection(
  schema: DataFetchingSelectionInterface,
  option: DataFetchingOptionsInterface
): DataFetchingOptionsInterface {
  return option;
}
