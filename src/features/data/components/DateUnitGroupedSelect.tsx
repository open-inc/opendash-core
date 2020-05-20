import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { DateUnitGroupedInterface, useTranslation } from "../../..";

export const DateUnitGroupedSelect = React.memo<
  SelectProps<DateUnitGroupedInterface>
>(
  React.forwardRef(function DateUnitGroupedSelect(props, ref) {
    const [t] = useTranslation(["opendash"]);

    return (
      <Select {...props}>
        <Select.Option value="minuteOfHour" children={t("ui.minuteOfHour")} />
        <Select.Option value="hourOfDay" children={t("ui.hourOfDay")} />
        <Select.Option value="hourOfWeek" children={t("ui.hourOfWeek")} />
        <Select.Option value="dayOfWeek" children={t("ui.dayOfWeek")} />
        <Select.Option value="dayOfMonth" children={t("ui.dayOfMonth")} />
        <Select.Option value="dayOfYear" children={t("ui.dayOfYear")} />
        <Select.Option value="weekOfYear" children={t("ui.weekOfYear")} />
        <Select.Option value="monthOfYear" children={t("ui.monthOfYear")} />
      </Select>
    );
  })
);
