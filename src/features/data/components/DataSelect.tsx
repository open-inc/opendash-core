import * as React from "react";

import {
  useTranslation,
  useOpenDashServices,
  useSource,
  useDataItems,
  SourceIdentifierInterface,
  DataItemIdentifierInterface,
  DataItemDimensionIdentifierInterface,
  DataItemSelectionInterface,
  SourceInterface,
  DataItemInterface,
  DataItemValueDisplay,
  DataItemChangedRelative,
  DataItemValueTypeInterface,
  AlarmModalToggle,
  DataItemSettingsModalToggle,
} from "../../..";

import { Table, Tag, Space, Input } from "antd";

interface Props {
  selectionOptions?: DataItemSelectionInterface;

  selection?:
    | SourceIdentifierInterface[]
    | DataItemIdentifierInterface[]
    | DataItemDimensionIdentifierInterface[];

  onSelection?: (
    nextValue:
      | SourceIdentifierInterface[]
      | DataItemIdentifierInterface[]
      | DataItemDimensionIdentifierInterface[]
  ) => void;

  /**
   * Enable/disable the 'Type' Column
   * @default true
   */
  showType?: boolean;

  /**
   * Enable/disable the 'Value' Column
   * @default true
   */
  showValue?: boolean;

  /**
   * Enable/disable the 'Timestamp' Column
   * @default true
   */
  showTimestamp?: boolean;

  /**
   * Enable/disable the 'Actions' Column
   * @default true
   */
  showActions?: boolean;

  /**
   * Enable/disable a search field above the table
   * @default true
   */
  showSearch?: boolean;

  style?: React.CSSProperties;
}

type RowType = {
  key: string;
  name: string;
  sourceKey?: SourceIdentifierInterface;
  item?: DataItemInterface;
  itemKey?: DataItemIdentifierInterface;
  dimension?: DataItemValueTypeInterface;
  dimensionNumber?: number;
  dimensionKey?: DataItemDimensionIdentifierInterface;
  dimensionType?: string;
  children?: RowType[];
};

export const DataSelect = React.memo<Props>(function DataSelect({
  selectionOptions: options,
  selection = [],
  onSelection = () => {},
  showType = true,
  showValue = true,
  showTimestamp = true,
  showActions = true,
  showSearch = true,
}) {
  const t = useTranslation();
  const { SourceService, DataService } = useOpenDashServices();
  const allItems = useDataItems();
  const [rootSource, , sources] = useSource();
  const [searchString, setSearchString] = React.useState("");

  const items = React.useMemo(() => {
    if (searchString) {
      const searchStrings = searchString.toLowerCase().split(" ");

      return allItems.filter((item) => {
        const searchIndex = [
          item.id,
          // item.name,
          DataService.getItemName(item),
          ...item.valueTypes.map((vt, i) => DataService.getItemName(item, i)),
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

  const data = React.useMemo(() => {
    return createNodesForSource(rootSource);

    function createNodesForSource(source: SourceInterface): RowType {
      const sourceChildren = SourceService.getChildren(
        source
      ).map((childSource) => createNodesForSource(childSource));

      const itemChildren = items
        .filter((item) => item.source === source.tag)
        .map((item) => createNodesForItem(item));

      return {
        key: JSON.stringify(source.id),
        name: source.name,
        sourceKey: source.id,
        children: [...sourceChildren, ...itemChildren],
      };
    }

    function createNodesForItem(item: DataItemInterface): RowType {
      if (item.valueTypes.length === 1) {
        const valueType = item.valueTypes[0];

        return {
          key:
            options?.select === "item"
              ? JSON.stringify([item.source, item.id])
              : JSON.stringify([item.source, item.id, 0]),
          name: DataService.getItemName(item, 0),
          dimension: valueType,
          dimensionNumber: 0,
          dimensionKey: [item.source, item.id, 0],
          dimensionType: valueType.type,
          item: item,
          itemKey: [item.source, item.id],
        };
      }

      return {
        key: JSON.stringify([item.source, item.id]),
        name: DataService.getItemName(item),
        item: item,
        itemKey: [item.source, item.id],
        children: item.valueTypes.map((valueType, i) => {
          return {
            key: JSON.stringify([item.source, item.id, i]),
            name: DataService.getItemName(item, i, true),
            dimension: valueType,
            dimensionNumber: i,
            dimensionKey: [item.source, item.id, i],
            dimensionType: valueType.type,
          };
        }),
      };
    }
  }, [sources, items, options?.select]);

  const columns = [
    {
      title: t("opendash:data.viewer.col_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("opendash:data.viewer.col_type"),
      dataIndex: "key",
      key: "type",
      render: (key, row: RowType) => {
        if (row.item && row.dimension) {
          return (
            <>
              <Tag>{t("opendash:data.item.label")}</Tag>
              <Tag>
                {t("opendash:data.item_dimension.types." + row.dimension.type)}
              </Tag>
            </>
          );
        }

        if (row.dimension) {
          <Tag>
            {t("opendash:data.item_dimension.types." + row.dimension.type)}
          </Tag>;
        }

        if (row.item) {
          return <Tag>{t("opendash:data.item.label")}</Tag>;
        }

        if (row.sourceKey) {
          return <Tag>{t("opendash:sources.label")}</Tag>;
        }

        return null;
      },
    },
    {
      title: t("opendash:data.viewer.col_value"),
      dataIndex: "key",
      key: "value",
      render: (key, row: RowType) => {
        if (!row.dimensionKey) {
          return null;
        }

        const [, , dimension] = row.dimensionKey;

        return (
          <span style={{ fontSize: ".9em" }}>
            <DataItemValueDisplay item={row.item} dimension={dimension} />
          </span>
        );
      },
    },
    {
      title: t("opendash:data.viewer.col_time"),
      dataIndex: "key",
      key: "time",
      render: (key, row: RowType) => {
        if (!row.dimensionKey) {
          return null;
        }

        return (
          <span style={{ fontSize: ".9em" }}>
            <DataItemChangedRelative item={row.item} />
          </span>
        );
      },
    },
    {
      title: t("opendash:data.viewer.col_actions"),
      dataIndex: "key",
      key: "actions",
      render: (key, row: RowType) => {
        if (!Number.isInteger(row.dimensionNumber)) {
          return null;
        }

        return (
          <Space>
            <DataItemSettingsModalToggle
              item={row.item}
              buttonProps={{ size: "small" }}
            />

            <AlarmModalToggle
              item={row.item}
              dimension={row.dimensionNumber}
              buttonProps={{ size: "small" }}
            />
          </Space>
        );
      },
    },
  ];

  const rowSelection = React.useMemo(
    () =>
      !options
        ? undefined
        : {
            type: (options?.max === 1 ? "radio" : "checkbox") as
              | "radio"
              | "checkbox",
            hideDefaultSelections: !!options?.max,
            selectedRowKeys: (selection as any[]).map((v) => JSON.stringify(v)),
            getCheckboxProps: (row) => ({
              disabled:
                options.select === "source"
                  ? !row.sourceKey
                  : options.select === "item"
                  ? !row.itemKey
                  : options.select === "dimension" &&
                    Array.isArray(options.types)
                  ? !row.dimensionKey ||
                    !options.types.includes(row.dimensionType)
                  : options.select === "dimension"
                  ? !row.dimensionKey
                  : true,
            }),
            onChange: (selectedRowKeys, selectedRows) => {
              const nextValue = selectedRows
                .filter(Boolean)
                .map((row) =>
                  options.select === "source"
                    ? row.sourceKey
                    : options.select === "item"
                    ? row.itemKey
                    : options.select === "dimension"
                    ? row.dimensionKey
                    : null
                );

              if (options.max && nextValue.length > options.max) {
                onSelection(nextValue.slice(nextValue.length - options.max));
              } else {
                onSelection(nextValue);
              }
            },
          },
    [options, selection, onSelection]
  );

  return (
    <>
      {showSearch && (
        <Input.Search
          placeholder={t("opendash:ui.search_enter_placeholder")}
          onSearch={(value) => {
            setSearchString(value);
          }}
          onChange={(e) => {
            if (!e.target.value) {
              setSearchString("");
            }
          }}
          style={{ marginBottom: 24 }}
        />
      )}
      <Table
        size="small"
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={data.children}
      />
    </>
  );
});
