import {
  useUrlParam,
  DataItemDimensionIdentifierInterface,
  DataItemInterface,
  useDataItem,
} from "../../..";

export function useAlarmModal(): [
  [DataItemInterface, number],
  (item: DataItemInterface, dimension?: number) => void
] {
  const [param, setParam] = useUrlParam<DataItemDimensionIdentifierInterface>(
    "alarm",
    undefined,
    "array"
  );

  const item = useDataItem(param?.[0], param?.[1]);
  const dimension = Number.isInteger(param?.[2]) ? param?.[2] : null;

  return [
    [item, dimension],
    (item, dimension) => {
      if (!item) {
        setParam(undefined);
      } else {
        setParam([item.source, item.id, dimension]);
      }
    },
  ];
}
