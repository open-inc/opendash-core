import * as React from "react";

import { useOpenDashApp } from "../../..";

import { WidgetTypeInterface } from "../../..";

export function useWidgetTypes(): WidgetTypeInterface[] {
  const app = useOpenDashApp();

  return app.widgets;
}
