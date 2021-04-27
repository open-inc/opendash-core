import * as React from "react";

import {
  WidgetComponent,
  useTranslation,
  createInternalComponent,
} from "../../..";

import { useParams } from "react-router";

export const WidgetRoute = createInternalComponent(function WidgetRoute() {
  const t = useTranslation();

  const { id } = useParams();

  return <WidgetComponent id={id} fullscreen={true} />;
});
