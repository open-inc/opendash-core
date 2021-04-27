import * as React from "react";

import { Modal, Tabs } from "antd";

import produce from "immer";

import { AdminLayout, createInternalComponent, Explorer } from "../../..";

interface Props {}

export const ExplorerRoute = createInternalComponent<Props>(
  function ExplorerRoute({}) {
    return (
      <AdminLayout contentPadding={true}>
        <Explorer />
      </AdminLayout>
    );
  }
);
