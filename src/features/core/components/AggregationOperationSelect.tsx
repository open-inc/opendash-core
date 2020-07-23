import * as React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { AggregationOperationInterface, useTranslation } from "../../..";

export const AggregationOperationSelect = React.memo<
  SelectProps<AggregationOperationInterface>
>(
  React.forwardRef(function AggregationOperationSelect(props, ref) {
    const t = useTranslation();

    return (
      <Select {...props}>
        <Select.Option
          value="min"
          children={t("opendash:ui.aggregation_min")}
        />
        <Select.Option
          value="max"
          children={t("opendash:ui.aggregation_max")}
        />
        <Select.Option
          value="sum"
          children={t("opendash:ui.aggregation_sum")}
        />
        <Select.Option
          value="stdd"
          children={t("opendash:ui.aggregation_stdd")}
        />
        <Select.Option
          value="variance"
          children={t("opendash:ui.aggregation_variance")}
        />
        <Select.Option
          value="mean"
          children={t("opendash:ui.aggregation_mean")}
        />
        <Select.Option
          value="avg"
          children={t("opendash:ui.aggregation_avg")}
        />
        <Select.Option
          value="count"
          children={t("opendash:ui.aggregation_count")}
        />
      </Select>
    );
  })
);
