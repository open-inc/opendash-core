import {
  useUrlParam,
  DataItemInterface,
  useDataItem,
  DataItemIdentifierInterface,
} from "../../..";

export function useDataItemSettingsModal(): [
  DataItemInterface,
  (item: DataItemInterface) => void
] {
  const [param, setParam] = useUrlParam<DataItemIdentifierInterface>(
    "data-item-settings",
    undefined,
    "array"
  );

  const item = useDataItem(param?.[0], param?.[1]);

  return [
    item,
    (item) => {
      if (!item) {
        setParam(undefined);
      } else {
        setParam([item.source, item.id]);
      }
    },
  ];
}
