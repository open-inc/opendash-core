import * as React from "react";

import { useTranslation, useDataItems } from "../../..";
import { Select } from "antd";

interface DataItemPickerProps {
  value: string;
  onChange: (nextValue: string) => void;
  style?: React.CSSProperties;
}

export function DataItemPicker({
  style,
  value,
  onChange,
}: DataItemPickerProps) {
  const [t] = useTranslation(["opendash"]);
  const items = useDataItems();

  return (
    <Select
      placeholder={t("ui.select_data_item")}
      style={style}
      value={value}
      onChange={(value) => onChange(value)}
    >
      {items.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}
