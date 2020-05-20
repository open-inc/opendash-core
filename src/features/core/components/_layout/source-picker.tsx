import * as React from "react";
import { Select } from "antd";
import { useSource } from "../../../..";

export default function HeaderSourcePicker() {
  const [source, setSource, sources] = useSource();

  if (!sources || sources.length === 0) {
    return null;
  }

  if (source && sources.length === 1) {
    return (
      <span style={{ color: "#999", userSelect: "none" }}>{source.name}</span>
    );
  }

  return (
    <Select
      style={{ width: 200 }}
      value={source ? source.id : undefined}
      onChange={setSource}
    >
      {sources.map((source) => (
        <Select.Option key={source.id} value={source.id}>
          {source.name}
        </Select.Option>
      ))}
    </Select>
  );
}
