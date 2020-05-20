import * as React from "react";
import { useTranslation } from "../../..";

import { Breadcrumb as AntdBreadcrumb } from "antd";

export function Breadcrumb({ style }) {
  const [t] = useTranslation(["opendash"]);
  const breadcrumb = [];

  return (
    <AntdBreadcrumb style={style}>
      {breadcrumb.map((item, index) => (
        <AntdBreadcrumb.Item key={index}>{t(item.label)}</AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
}
