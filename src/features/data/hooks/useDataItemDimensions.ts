import * as React from "react";
import { useDataItems, DataItemInterface } from "../../..";

interface useDataItemDimensionsResult {
  id: string;
  name: string;
  source: string;
  dimension: number;
  valueType: {
    unit: string;
    name: string;
    type: string;
  };
  item: DataItemInterface;
}

export function useDataItemDimensions(
  searchString?: string
): useDataItemDimensionsResult[] {
  const items = useDataItems();

  const itemsFormatted: useDataItemDimensionsResult[] = React.useMemo(
    () =>
      items.flatMap((item) =>
        item.valueTypes.map((valueType, dimension) => ({
          id: item.id,
          name: item.name,
          source: item.source,
          dimension,
          valueType,
          item,
        }))
      ),
    [items]
  );

  const result = React.useMemo(() => {
    if (!searchString) {
      return itemsFormatted;
    }

    const searchStrings = searchString.toLowerCase().split(" ");

    const result = itemsFormatted.filter((item) => {
      const searchIndex = [item.id, item.name, item.valueType.name]
        .join("~")
        .toLowerCase();

      return searchStrings.every((searchTerm) =>
        searchIndex.includes(searchTerm)
      );
    });

    return result;
  }, [searchString, itemsFormatted]);

  return result;
}
