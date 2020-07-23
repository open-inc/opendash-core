import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { DateUnitGroupedInterface, useTranslation } from "../../..";

export const DateUnitGroupedSelect = React.memo<
  SelectProps<DateUnitGroupedInterface>
>(
  React.forwardRef(function DateUnitGroupedSelect(props, ref) {
    const t = useTranslation();

    return (
      <Select {...props}>
        <Select.Option
          value="minuteOfHour"
          children={t("opendash:ui.minuteOfHour")}
        />
        <Select.Option
          value="hourOfDay"
          children={t("opendash:ui.hourOfDay")}
        />
        <Select.Option
          value="hourOfWeek"
          children={t("opendash:ui.hourOfWeek")}
        />
        <Select.Option
          value="dayOfWeek"
          children={t("opendash:ui.dayOfWeek")}
        />
        <Select.Option
          value="dayOfMonth"
          children={t("opendash:ui.dayOfMonth")}
        />
        <Select.Option
          value="dayOfYear"
          children={t("opendash:ui.dayOfYear")}
        />
        <Select.Option
          value="weekOfYear"
          children={t("opendash:ui.weekOfYear")}
        />
        <Select.Option
          value="monthOfYear"
          children={t("opendash:ui.monthOfYear")}
        />
      </Select>
    );
  })
);
