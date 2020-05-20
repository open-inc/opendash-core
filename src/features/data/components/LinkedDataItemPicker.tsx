import * as React from "react";

import {
  useTranslation,
  useWidgetDataItem,
  DataItemValuePicker,
} from "../../..";

interface DataItemPickerProps {
  style?: React.CSSProperties;
}

export function LinkedDataItemPicker({ style }: DataItemPickerProps) {
  const [t] = useTranslation(["opendash"]);
  const [value, dimension, setValue] = useWidgetDataItem();

  return (
    <DataItemValuePicker
      placeholder={t("ui.select_data_item_linked")}
      style={style}
      value={value ? [value.id, dimension] : undefined}
      onChange={(nextValue) => setValue(nextValue)}
    ></DataItemValuePicker>
  );
}
