import * as React from "react";
import moment from "moment";

import { useTranslation, useWidgetDataItemHistoryOptions } from "../../..";
import { DatePicker } from "antd";

interface Props {
  style?: React.CSSProperties;
}

export function LinkedDataItemHistoryOptionsPicker({ style }: Props) {
  const [t] = useTranslation(["opendash"]);
  const [value, setValue] = useWidgetDataItemHistoryOptions();

  return (
    <DatePicker.RangePicker
      allowClear={false}
      disabledDate={(date) => date.isAfter(new Date())}
      placeholder={t("ui.select_date_linked")}
      style={style}
      value={[moment(value.start), moment(value.end)]}
      onChange={(nextValue) =>
        setValue({
          ...value,
          start: nextValue[0].valueOf(),
          end: nextValue[1].valueOf(),
        })
      }
    ></DatePicker.RangePicker>
  );
}
