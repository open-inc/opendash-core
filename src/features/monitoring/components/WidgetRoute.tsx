import * as React from "react";

import { WidgetComponent, useTranslation } from "../../..";

import { useParams } from "react-router";

export const WidgetRoute = React.memo(function WidgetRoute() {
  const t = useTranslation();

  const { id } = useParams();

  return <WidgetComponent id={id} fullscreen={true} />;
});
