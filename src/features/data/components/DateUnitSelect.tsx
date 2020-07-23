import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { DateUnitInterface, useTranslation } from "../../..";

export const DateUnitSelect = React.memo<SelectProps<DateUnitInterface>>(
  React.forwardRef(function DateUnitSelect(props, ref) {
    const t = useTranslation();

    return (
      <Select {...props}>
        <Select.Option value="minute" children={t("opendash:ui.minute")} />
        <Select.Option value="hour" children={t("opendash:ui.hour")} />
        <Select.Option value="day" children={t("opendash:ui.day")} />
        <Select.Option value="week" children={t("opendash:ui.week")} />
        <Select.Option value="month" children={t("opendash:ui.month")} />
        <Select.Option value="year" children={t("opendash:ui.year")} />
      </Select>
    );
  })
);
