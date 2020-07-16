import * as React from "react";

import {
  useTranslation,
  DataSelect,
  AdminLayout,
  useSource,
  useOpenDashServices,
  useDataItems,
  produce,
} from "../../..";

import { AdminToolbar } from "@opendash/ui";

import { Table, Tag, Input, Button, message, Space } from "antd";

interface Props {}

export const DataItemRenameRoute = React.memo<Props>(
  function DataItemRenameRoute() {
    const [t] = useTranslation(["opendash"]);
    const { DataService, UserStorageService } = useOpenDashServices();

    const [source, , sources] = useSource();
    const allItems = useDataItems();

    const [searchString, setSearchString] = React.useState("");
    const [state, setState] = React.useState<Record<string, string>>({});
    const [saving, setSaving] = React.useState<boolean>(false);

    React.useEffect(() => {
      if (source) {
        setState(
          UserStorageService._getSync(`opendash/data/names/${source.tag}`) || {}
        );
      } else {
        setState({});
      }
    }, [source?.id]);

    const items = React.useMemo(() => {
      if (searchString) {
        const searchStrings = searchString.toLowerCase().split(" ");

        return allItems
          .filter((item) => item.source === source.tag)
          .filter((item) => {
            const searchIndex = [
              item.id,
              item.name,
              ...item.valueTypes.map((vt) => vt.name),
            ]
              .join("~")
              .toLowerCase();

            return searchStrings.every((searchTerm) =>
              searchIndex.includes(searchTerm)
            );
          });
      }

      return allItems;
    }, [allItems, searchString]);

    const rows = React.useMemo(() => {
      return items.map((item) => {
        return {
          type: "item",
          id: item.id,
          name: item.name,
          key: JSON.stringify([item.id]),
          children: item.valueTypes.map((valueType, i) => {
            return {
              type: "dimension",
              id: i,
              name: valueType.name,
              key: JSON.stringify([item.id, i]),
            };
          }),
        };
      });
    }, [items]);

    const columns = [
      {
        title: t("account.data_item_rename.col_name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("account.data_item_rename.col_id"),
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("account.data_item_rename.col_rename"),
        dataIndex: "key",
        key: "key",
        render: (key) => {
          return (
            <Input
              placeholder={t("account.data_item_rename.input_placeholder")}
              value={state[key]}
              allowClear={true}
              onChange={(e) => {
                const value = e.target.value;

                setState(produce((draft) => void (draft[key] = value)));
              }}
            />
          );
        },
      },
    ];

    function submit() {
      setSaving(true);

      UserStorageService.set(`opendash/data/names/${source.tag}`, state)
        .then(
          (ok) => {
            message.success(t("account.data_item_settings.save_success"));
            close();
          },
          (error) => {
            message.error(t("account.data_item_settings.save_error"));
          }
        )
        .finally(() => {
          setSaving(false);
        });
    }

    return (
      <AdminLayout>
        <AdminToolbar
          title={t("account.data_item_rename.label")}
          description={t("account.data_item_rename.description")}
          search={searchString}
          onSearch={setSearchString}
          actions={[
            <Button
              key="save"
              loading={saving}
              onClick={() => submit()}
              children={t("ui.save")}
              type="primary"
            />,
            <Button
              key="reset"
              disabled={saving}
              onClick={() => {
                setState({});
              }}
              children={t("ui.reset")}
            />,
          ]}
        />
        <Table
          size="small"
          columns={columns}
          pagination={false}
          dataSource={rows}
          expandable={{
            defaultExpandAllRows: true,
            expandIcon: () => null,
            indentSize: 24,
          }}
        />
      </AdminLayout>
    );
  }
);
