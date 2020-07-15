import * as React from "react";

import { useTranslation, DataSelect, AdminLayout } from "../../..";

import { Table, Tag } from "antd";

interface Props {}

export const DataItemOverviewRoute = React.memo<Props>(
  function DataItemOverviewRoute() {
    const [t] = useTranslation(["opendash"]);

    return (
      <AdminLayout>
        <DataSelect />
      </AdminLayout>
    );
  }
);
