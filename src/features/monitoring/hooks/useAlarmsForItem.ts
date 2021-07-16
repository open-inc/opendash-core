import React from "react";
import {
  DataItemInterface,
  AlarmInterface,
  useMonitoringService,
  useServiceStore,
} from "../../..";

export function useAlarmsForItem(
  item: DataItemInterface,
  dimension?: number
): AlarmInterface[] {
  const monitoring = useMonitoringService();

  return useServiceStore(
    monitoring,
    React.useCallback(
      (state) => {
        if (!item) {
          return [];
        }

        if (Number.isInteger(dimension)) {
          return state.alarms.filter(
            (alarm) =>
              alarm.item[0] === item.source &&
              alarm.item[1] === item.id &&
              alarm.item[2] === dimension
          );
        }

        return state.alarms.filter(
          (alarm) => alarm.item[0] === item.source && alarm.item[1] === item.id
        );
      },
      [item?.source, item?.id, dimension]
    )
  );
}
