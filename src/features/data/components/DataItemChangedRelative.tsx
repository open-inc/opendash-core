import * as React from "react";

import {
  FormatRelativeDates,
  useDataItemValue,
  DataItemInterface,
} from "../../..";

interface Props {
  item: DataItemInterface;
}

export const DataItemChangedRelative = React.memo<Props>(({ item }) => {
  const value = useDataItemValue(item);

  if (!value) {
    return null;
  }

  return <FormatRelativeDates start={Math.min(value.date, Date.now())} />;
});
