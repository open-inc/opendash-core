import * as React from "react";

import { useDataItem, useDataItemValue, DataItemInterface } from "../../..";

interface Props {
  item: DataItemInterface;
  dimension: number;

  booleanSize?: number;
}

export const DataItemValueDisplay = React.memo<Props>(
  ({ item, dimension, booleanSize = 10 }) => {
    const value = useDataItemValue(item);

    if (!value) {
      console.warn(`DataItemValueDisplay: Value not found '${item?.id}'`);
      return null;
    }

    if (!item?.valueTypes?.[dimension]) {
      console.warn(
        `DataItemValueDisplay: Item Value Dimension not found '${item?.id}' '${dimension}'`
      );

      return null;
    }

    if (
      value?.value?.[dimension] === null ||
      value?.value?.[dimension] === undefined
    ) {
      console.warn(
        `DataItemValueDisplay: Value Dimension not found '${item?.id}' '${dimension}'`
      );

      return null;
    }

    if (item.valueTypes[dimension].type === "String") {
      return (
        <span>
          {value.value[dimension]} {item.valueTypes[dimension].unit}
        </span>
      );
    }

    if (item.valueTypes[dimension].type === "Number") {
      return (
        <span>
          {value.value[dimension]} {item.valueTypes[dimension].unit}
        </span>
      );
    }

    if (item.valueTypes[dimension].type === "Boolean") {
      return (
        <span
          style={{
            display: "inline-block",
            width: booleanSize,
            height: booleanSize,
            borderRadius: booleanSize,
            border: "1px solid #0063AC",
            background: value.value[dimension] ? "#0063AC" : "transparent",
          }}
        />
      );
    }

    console.warn(
      "DataItemValueDisplay: item or dimension not available or no way to display value type"
    );

    return null;
  }
);
