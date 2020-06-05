import {
  useAppState,
  equals,
  DataItemInterface,
  AlarmInterface,
} from "../../..";

export function useAlarmsForItem(
  item: DataItemInterface,
  dimension?: number
): AlarmInterface[] {
  return useAppState((state) => {
    if (!item) {
      return [];
    }

    if (Number.isInteger(dimension)) {
      return state.dashboards.alarms.filter(
        (alarm) =>
          alarm.item[0] === item.source &&
          alarm.item[1] === item.id &&
          alarm.item[2] === dimension
      );
    }

    return state.dashboards.alarms.filter(
      (alarm) => alarm.item[0] === item.source && alarm.item[1] === item.id
    );
  });
}
