import * as React from "react";

import { useWidgetTypes } from "../../..";

import { WidgetTypeInterface } from "../../..";

export function useWidgetType(type: string): WidgetTypeInterface {
  return useWidgetTypes().find((wt) => wt.type === type);
}
