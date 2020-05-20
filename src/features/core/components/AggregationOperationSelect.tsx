import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { AggregationOperationInterface, useTranslation } from "../../..";

export const AggregationOperationSelect = React.memo<
  SelectProps<AggregationOperationInterface>
>(
  React.forwardRef(function AggregationOperationSelect(props, ref) {
    const [t] = useTranslation(["opendash"]);

    return (
      <Select {...props}>
        <Select.Option value="min" children={t("ui.aggregation_min")} />
        <Select.Option value="max" children={t("ui.aggregation_max")} />
        <Select.Option value="sum" children={t("ui.aggregation_sum")} />
        <Select.Option value="stdd" children={t("ui.aggregation_stdd")} />
        <Select.Option
          value="variance"
          children={t("ui.aggregation_variance")}
        />
        <Select.Option value="mean" children={t("ui.aggregation_mean")} />
        <Select.Option value="avg" children={t("ui.aggregation_avg")} />
        <Select.Option value="count" children={t("ui.aggregation_count")} />
      </Select>
    );
  })
);
