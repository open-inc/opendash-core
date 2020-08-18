import * as React from "react";

import { useTranslation, DataSelect, AdminLayout } from "../../..";

import { Table, Tag } from "antd";
import { AdminToolbar } from "@opendash/ui";

interface Props {}

export const DataItemOverviewRoute = React.memo<Props>(
  function DataItemOverviewRoute() {
    const t = useTranslation();
    const [searchString, setSearchString] = React.useState("");

    return (
      <AdminLayout>
        <AdminToolbar
          title={t("opendash:account.data_item_settings.label")}
          description={t("opendash:account.data_item_settings.description")}
          search={searchString}
          onSearch={setSearchString}
          actions={[]}
        />
        <DataSelect showActions={true} />
      </AdminLayout>
    );
  }
);
