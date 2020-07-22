import * as React from "react";

import { Modal, Tabs } from "antd";

import produce from "immer";

import { AdminLayout, Explorer } from "../../..";

interface Props {}

export const ExplorerRoute = React.memo<Props>(function ExplorerRoute({}) {
  return (
    <AdminLayout>
      <Explorer />
    </AdminLayout>
  );
});
