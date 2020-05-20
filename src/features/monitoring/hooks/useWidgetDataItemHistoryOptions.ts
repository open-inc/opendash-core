import * as React from "react";

import { useStorage, DataFetchingOptionsInterface } from "../../..";

type useWidgetDataItemResult = [
  DataFetchingOptionsInterface,
  (input: DataFetchingOptionsInterface) => void
];

export function useWidgetDataItemHistoryOptions(): useWidgetDataItemResult {
  return useStorage<DataFetchingOptionsInterface>(
    "device",
    "opendash:data:linked_history_options",
    {
      start: undefined,
      end: undefined,
    }
  );
}
