import * as React from "react";

import {
  useTranslation,
  useDataItemDimensions,
  useDebounce,
  DataItemDimensionIdentifierInterface,
  useOpenDashServices,
} from "../../..";
import { Select } from "antd";

interface Props {
  value: DataItemDimensionIdentifierInterface[];
  onChange: (nextValue: DataItemDimensionIdentifierInterface[]) => void;
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
  const { DataService } = useOpenDashServices();
  const searchStringDebounced = useDebounce(searchString, 500);
  const items = useDataItemDimensions(searchStringDebounced);

  return (
    <Select
      showSearch
      placeholder={t(placeholder || "opendash.ui.select_data_item")}
      style={style}
      value={value?.[0] ? JSON.stringify(value[0]) : undefined}
      onChange={(value: string) => {
        onChange([JSON.parse(value)]);
      }}
      onSearch={(value) => {
        setSearchString(value);
      }}
      filterOption={(input, option) => true}
    >
      {items.map((item) => (
        <Select.Option
          key={JSON.stringify([item.source, item.id, item.dimension])}
          value={JSON.stringify([item.source, item.id, item.dimension])}
        >
          {DataService.getItemName(item.item, item.dimension)}
        </Select.Option>
      ))}
    </Select>
  );
};
