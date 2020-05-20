import * as React from "react";

import { formatRelativeDates, useInterval } from "../../..";

interface Props {
  start: Date | number;
}

export const FormatRelativeDates = React.memo<Props>(({ start }) => {
  const [state, setState] = React.useState(formatRelativeDates(start));

  useInterval(() => {
    const next = formatRelativeDates(start);

    if (next !== state) {
      setState(next);
    }
  }, 500);

  return <span>{state}</span>;
});
