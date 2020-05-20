import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { DateUnitInterface, useTranslation } from "../../..";

export const DateUnitSelect = React.memo<SelectProps<DateUnitInterface>>(
  React.forwardRef(function DateUnitSelect(props, ref) {
    const [t] = useTranslation(["opendash"]);

    return (
      <Select {...props}>
        <Select.Option value="minute" children={t("ui.minute")} />
        <Select.Option value="hour" children={t("ui.hour")} />
        <Select.Option value="day" children={t("ui.day")} />
        <Select.Option value="week" children={t("ui.week")} />
        <Select.Option value="month" children={t("ui.month")} />
        <Select.Option value="year" children={t("ui.year")} />
      </Select>
    );
  })
);
