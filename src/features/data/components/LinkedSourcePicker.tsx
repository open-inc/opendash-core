import * as React from "react";

import { useSource } from "../../..";
import { Select } from "antd";

interface Props {
  style?: React.CSSProperties;
}

export function LinkedSourcePicker({ style }: Props) {
  const [source, setSource, sources] = useSource();

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Select
      style={style}
      value={source ? source.id : undefined}
      onChange={setSource}
      disabled={sources.length < 2}
    >
      {sources.map((source) => (
        <Select.Option key={source.id} value={source.id}>
          {source.name}
        </Select.Option>
      ))}
    </Select>
  );
}
