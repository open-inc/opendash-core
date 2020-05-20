import * as React from "react";

import { Spin } from "antd";

export function Loading({ message }) {
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <Spin />
      {message && <div style={{ paddingTop: 20 }}>{message}</div>}
    </div>
  );
}
