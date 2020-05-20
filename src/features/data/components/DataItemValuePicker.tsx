import * as React from "react";

import { useTranslation, useDataItemDimensions, useDebounce } from "../../..";
import { Select } from "antd";

const DIVIDER = "---";

interface Props {
  value: [string, number];
  onChange: (nextValue: [string, number]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const DataItemValuePicker: React.FC<Props> = ({
  style,
  placeholder,
  value,
  onChange,
}) => {
  const [t] = useTranslation(["opendash"]);
  const [searchString, setSearchString] = React.useState<string>();
  const searchStringDebounced = useDebounce(searchString, 500);
  const items = useDataItemDimensions(searchStringDebounced);

  return (
    <Select
      showSearch
      placeholder={t(placeholder || "opendash.ui.select_data_item")}
      style={style}
      value={value ? value.join(DIVIDER) : undefined}
      onChange={(value: string) => {
        const [id, dimension] = value.split(DIVIDER);
        onChange([id, parseInt(dimension)]);
      }}
      onSearch={(value) => {
        setSearchString(value);
      }}
      filterOption={(input, option) => true}
    >
      {items.map((item) => (
        <Select.Option
          key={[item.id, item.dimension].join(DIVIDER)}
          value={[item.id, item.dimension].join(DIVIDER)}
        >
          {item.name} ~ {item.valueType.name}
        </Select.Option>
      ))}
    </Select>
  );
};
