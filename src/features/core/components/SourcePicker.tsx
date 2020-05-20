import * as React from "react";
import { Select } from "antd";
import { useSource } from "../../..";

export function SourcePicker({ value, onChange }) {
  const [, , sources] = useSource();

  return (
    <Select
      style={{ width: 200 }}
      value={value?.id}
      onChange={(id) => onChange(sources.find((source) => source.id === id))}
    >
      {sources.map((source) => (
        <Select.Option key={source.id} value={source.id}>
          {source.name}
        </Select.Option>
      ))}
    </Select>
  );
}
