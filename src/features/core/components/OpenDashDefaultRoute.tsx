import * as React from "react";

import { Result } from "antd";
import { useTranslation } from "../../..";

export function OpenDashDefaultRoute(params: any) {
  const t = useTranslation();

  return (
    <Result
      status="warning"
      title={t("opendash:error.not_found_title")}
      subTitle={t("opendash:error.not_found_subtitle")}
    />
  );
}
