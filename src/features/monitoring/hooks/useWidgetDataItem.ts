import * as React from "react";

import { useStorage, useDataItems, DataItemInterface } from "../../..";
import { DataItemDimensionIdentifierInterface } from "../../data/types/DataItemDimensionIdentifierInterface";

type DataItemValueDimension = number;

type useWidgetDataItemResult = [
  DataItemInterface,
  DataItemValueDimension,
  (item: DataItemDimensionIdentifierInterface) => void
];

/**
 * Use this hook to get the currently selected data item for the widget.
 * It may come from two places:
 *
 * 1. If your widget requests the selection of an data item
 *    it may be the one selected by the user.
 * 2. If your widget is placed on a linked dashboard, the linked
 *    data item may be returned.
 *
 * If your widget fits none of the above, the hook will throw an Error
 */
export function useWidgetDataItem(): useWidgetDataItemResult {
  const items = useDataItems();

  const [currentItem, setCurrentItem] = useStorage(
    "device",
    "opendash:data:linked_item"
  );

  const currentItemId = currentItem?.[0];
  const dimension = currentItem?.[1];

  const value: DataItemInterface = React.useMemo(
    () => items.find((item) => item.id === currentItemId),
    [items, currentItem]
  );

  function setValue(item: DataItemDimensionIdentifierInterface): void {
    if (Array.isArray(item) && item.length === 3) {
      setCurrentItem(item);
      return;
    }

    throw new Error("Bad usage of useWidgetDataItem");
  }

  return [value, dimension, setValue];
}
