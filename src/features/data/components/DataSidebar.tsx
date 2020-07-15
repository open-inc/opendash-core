import * as React from "react";

import { Drawer, Input } from "antd";

import {
  useTranslation,
  DataItemValueDisplay,
  DataItemInterface,
  compare,
  DataItemChangedRelative,
  useDataItems,
  AlarmModalToggle,
} from "../../..";

import {
  Table,
  TableBody,
  TableHeader,
  TableRowLabels,
  TableRow,
  TableCell,
} from "./DataSidebar.layout";

interface Props {
  open: boolean;
  close: () => void;
}

export const DataSidebar: React.FC<Props> = ({ open, close }) => {
  const [t] = useTranslation(["opendash"]);
  const [searchString, setSearchString] = React.useState("");
  const allItems = useDataItems();

  const items = React.useMemo(() => {
    if (searchString) {
      const searchStrings = searchString.toLowerCase().split(" ");

      return allItems.filter((item) => {
        const searchIndex = [item.id, item.name].join("~").toLowerCase();

        return searchStrings.every((searchTerm) =>
          searchIndex.includes(searchTerm)
        );
      });
    }

    return allItems;
  }, [allItems, searchString]);

  const groups = useData(items);

  return (
    <Drawer
      title={t("monitoring.data_sidebar.title")}
      visible={open}
      width={Math.min(600, window.innerWidth)}
      onClose={(e) => close()}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ padding: 24 }}>
        {/* <LinkedSourcePicker style={{ width: "100%" }} /> */}
        <Input.Search
          placeholder={t("ui.search_enter_placeholder")}
          onSearch={(value) => {
            setSearchString(value);
          }}
        />
      </div>
      <Table>
        {groups.map(({ unit, count, items }) => (
          <TableBody key={unit}>
            <TableHeader>
              <TableCell colSpan={7}>
                {unit} ({count})
              </TableCell>
            </TableHeader>
            <TableRowLabels>
              <TableCell>{t("monitoring.data_sidebar.col_name")}</TableCell>
              <TableCell>{t("monitoring.data_sidebar.col_value")}</TableCell>
              <TableCell>{t("monitoring.data_sidebar.col_date")}</TableCell>
              <TableCell></TableCell>
            </TableRowLabels>
            {(items as any[]).map((item) => (
              <TableRow
                key={item.key}
                title={`ID: ${item.id}\nDimension: ${item.dimension}`}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <DataItemValueDisplay
                    item={item.item}
                    dimension={item.dimension}
                  />
                </TableCell>
                <TableCell>
                  <DataItemChangedRelative item={item.item} />
                </TableCell>
                <TableCell>
                  <AlarmModalToggle
                    item={item.item}
                    dimension={item.dimension}
                    buttonProps={{ size: "small" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </Drawer>
  );
};

function useData(items: DataItemInterface[]) {
  return React.useMemo(() => {
    const units: any = {
      Events: [],
    };

    items.forEach((item) => {
      item.valueTypes.forEach((valueType, dimension) => {
        if (["Boolean", "Number", "String"].includes(valueType.type)) {
          const group =
            valueType.type === "Boolean" ? "Events" : valueType.unit || "-";

          if (!units[group]) {
            units[group] = [];
          }

          const x = {
            source: item.source,
            id: item.id,
            dimension,
            item: item,
            key: [item.id, dimension].join("~"),
            name: `${item.name} ~ ${valueType.name}`,
          };

          units[group].push(x);
        }
      });
    });

    return Object.entries(units).map(([unit, items]) => ({
      unit,
      count: (items as any[]).length,
      items: (items as any[]).sort(compare((i) => i.name)),
    }));
  }, [items]);
}
