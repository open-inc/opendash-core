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
} from "../../..";

import { Table, Tag } from "antd";

interface Props {
  selectionOptions?: DataItemSelectionInterface;
  selection:
    | SourceIdentifierInterface[]
    | DataItemIdentifierInterface[]
    | DataItemDimensionIdentifierInterface[];
  onSelection: (
    nextValue:
      | SourceIdentifierInterface[]
      | DataItemIdentifierInterface[]
      | DataItemDimensionIdentifierInterface[]
  ) => void;
  style?: React.CSSProperties;
}

type RowType = {
  key: string;
  name: string;
  sourceKey?: SourceIdentifierInterface;
  item?: DataItemInterface;
  itemKey?: DataItemIdentifierInterface;
  dimension?: DataItemValueTypeInterface;
  dimensionKey?: DataItemDimensionIdentifierInterface;
  dimensionType?: string;
  children?: RowType[];
};

export const DataSelect = React.memo<Props>(function DataSelect({
  selectionOptions: options,
  selection = [],
  onSelection,
}) {
  const [t] = useTranslation(["opendash"]);
  const { SourceService } = useOpenDashServices();
  const items = useDataItems();
  const [rootSource, , sources] = useSource();

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
          name: `${item.name} (${valueType.name})`,
          dimension: valueType,
          dimensionKey: [item.source, item.id, 0],
          dimensionType: valueType.type,
          item: item,
          itemKey: [item.source, item.id],
        };
      }

      return {
        key: JSON.stringify([item.source, item.id]),
        name: item.name,
        item: item,
        itemKey: [item.source, item.id],
        children: item.valueTypes.map((valueType, i) => {
          return {
            key: JSON.stringify([item.source, item.id, i]),
            name: valueType.name,
            dimension: valueType,
            dimensionKey: [item.source, item.id, i],
            dimensionType: valueType.type,
          };
        }),
      };
    }
  }, [sources, items, options?.select]);

  const columns = [
    {
      title: t("data.viewer.col_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("data.viewer.col_type"),
      dataIndex: "key",
      key: "type",
      render: (key, row: RowType) => {
        if (row.item && row.dimension) {
          return (
            <>
              <Tag>{t("data.item.label")}</Tag>
              <Tag>{t("data.item_dimension.types." + row.dimension.type)}</Tag>
            </>
          );
        }

        if (row.dimension) {
          <Tag>{t("data.item_dimension.types." + row.dimension.type)}</Tag>;
        }

        if (row.item) {
          return <Tag>{t("data.item.label")}</Tag>;
        }

        if (row.sourceKey) {
          return <Tag>{t("sources.label")}</Tag>;
        }

        return null;
      },
    },
    {
      title: t("data.viewer.col_value"),
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
      title: t("data.viewer.col_time"),
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
    <Table
      size="small"
      columns={columns}
      pagination={false}
      rowSelection={rowSelection}
      dataSource={data.children}
    />
  );
});
