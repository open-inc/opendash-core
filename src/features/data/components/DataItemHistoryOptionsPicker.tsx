import * as React from "react";
import moment from "moment";
import produce from "immer";

import {
  useTranslation,
  DataFetchingSelectionInterface,
  useDeepCompareEffect,
  DataFetchingOptionsInterface,
} from "../../..";

import {
  Radio,
  DatePicker,
  InputNumber,
  Checkbox,
  Select,
  Row,
  Col,
} from "antd";

const COL_STYLE: React.CSSProperties = { marginBottom: 24 };
const INPUT_STYLE: React.CSSProperties = { width: "100%" };

interface Props {
  value: DataFetchingOptionsInterface;
  onChange: (nextValue: DataFetchingOptionsInterface) => void;
  options?: DataFetchingSelectionInterface;
  style?: React.CSSProperties;
}

export function DataItemHistoryOptionsPicker({
  style,
  options = {},
  value = {},
  onChange,
}: Props) {
  const t = useTranslation();

  useDeepCompareEffect(() => {
    onChange(
      produce(value, (draft) => {
        if (!options.live) {
          draft.live = false;
        } else if (options.live && options.liveRequired) {
          draft.live = true;
        }

        if (!options.history) {
          Object.assign(draft, {
            historyType: undefined,
            start: undefined,
            end: undefined,
            unit: undefined,
            value: undefined,
            aggregation: undefined,
          });
        } else if (
          options.history &&
          options.historyRequired &&
          !draft.historyType
        ) {
          draft.historyType = "absolute";
        }

        if (draft.historyType === "absolute") {
          draft.value = undefined;
          draft.unit = undefined;

          if (!draft.start || !draft.end) {
            draft.start = moment().subtract(7, "day").startOf("day").valueOf();
            draft.end = Date.now();
          }
        }

        if (draft.historyType === "relative") {
          draft.start = undefined;
          draft.end = undefined;

          if (!draft.value || !draft.unit) {
            draft.value = 1;
            draft.unit = "week";
          }
        }

        if (!draft.historyType) {
          draft.start = undefined;
          draft.end = undefined;
          draft.value = undefined;
          draft.unit = undefined;
        }

        if (!options.aggregation) {
          draft.aggregation = false;
        } else if (
          options.aggregation &&
          options.aggregationRequired &&
          !draft.aggregation
        ) {
          draft.aggregation = true;
        }

        if (draft.aggregation && !draft.aggregationOperation) {
          draft.aggregationOperation = "count";
        }

        if (draft.aggregation && !draft.aggregationOperation) {
          draft.aggregationOperation = "count";
        }
      })
    );
  }, [value]);

  return (
    <>
      <Row gutter={16}>
        <Col style={COL_STYLE} span={24}>
          <Checkbox
            checked={value.live}
            disabled={!options?.live || options?.liveRequired}
            onChange={(e) => {
              onChange(
                merge(value, {
                  live: e.target.checked,
                })
              );
            }}
          >
            {t("opendash:monitoring.history_options.live_enabled")}
          </Checkbox>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col style={COL_STYLE} span={24}>
          <Checkbox
            checked={!!value.historyType}
            disabled={!options?.history || options?.historyRequired}
            onChange={(e) => {
              onChange(
                merge(value, {
                  historyType: e.target.checked ? "absolute" : undefined,
                })
              );
            }}
          >
            {t("opendash:monitoring.history_options.history_enabled")}
          </Checkbox>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col style={COL_STYLE} span={24}>
          <Radio.Group
            disabled={!value.historyType}
            size="small"
            value={value.historyType}
            onChange={(e) => {
              onChange(
                merge(value, {
                  historyType: e.target.value,
                })
              );
            }}
          >
            <Radio.Button value="absolute">
              {t("opendash:monitoring.history_options.type_absolute")}
            </Radio.Button>
            <Radio.Button value="relative">
              {t("opendash:monitoring.history_options.type_relative")}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      {value.historyType === "relative" && (
        <Row gutter={16}>
          <Col style={COL_STYLE} span={12}>
            <InputNumber
              disabled={!value.historyType}
              style={INPUT_STYLE}
              min={1}
              value={value.value}
              onChange={(nextValue: number) =>
                onChange(
                  merge(value, {
                    value: Math.floor(Math.max(nextValue, 1)),
                  })
                )
              }
            />
          </Col>
          <Col style={COL_STYLE} span={12}>
            <Select
              disabled={!value.historyType}
              style={INPUT_STYLE}
              value={value.unit}
              onChange={(unit) => {
                onChange(
                  merge(value, {
                    unit,
                  })
                );
              }}
            >
              <Select.Option value="minute">
                {t("opendash:ui.minute", { count: value.value })}
              </Select.Option>
              <Select.Option value="hour">
                {t("opendash:ui.hour", { count: value.value })}
              </Select.Option>
              <Select.Option value="day">
                {t("opendash:ui.day", { count: value.value })}
              </Select.Option>
              <Select.Option value="week">
                {t("opendash:ui.week", { count: value.value })}
              </Select.Option>
              <Select.Option value="month">
                {t("opendash:ui.month", { count: value.value })}
              </Select.Option>
              <Select.Option value="year">
                {t("opendash:ui.year", { count: value.value })}
              </Select.Option>
            </Select>
          </Col>
        </Row>
      )}

      {value.historyType === "absolute" && (
        <Row gutter={16}>
          <Col style={COL_STYLE} span={24}>
            <DatePicker.RangePicker
              disabled={!value.historyType}
              allowClear={false}
              // TODO:
              // @ts-ignore
              placeholder={t("opendash:ui.select_date_range")}
              style={style}
              value={[moment(value?.start), moment(value?.end)]}
              onChange={(nextValue) =>
                onChange(
                  merge(value, {
                    start: nextValue[0].valueOf(),
                    end: nextValue[1].valueOf(),
                    unit: undefined,
                    value: undefined,
                  })
                )
              }
            />
          </Col>
        </Row>
      )}

      <Row gutter={16}>
        <Col style={COL_STYLE} span={24}>
          <Select
            style={INPUT_STYLE}
            disabled={!options?.aggregation}
            value={
              value.aggregation && value.aggregationOperation
                ? value.aggregationOperation
                : "none"
            }
            onChange={(aggregation) => {
              onChange(
                produce(value, (draft) => {
                  if (aggregation === "none") {
                    draft.aggregation = false;
                    draft.aggregationOperation = undefined;
                    draft.aggregationSplits = undefined;
                  } else {
                    draft.aggregation = true;
                    draft.aggregationOperation = aggregation;
                  }
                })
              );
            }}
          >
            <Select.Option value="none">
              {t("opendash:monitoring.history_options.aggregation_none")}
            </Select.Option>

            <Select.Option value="sum">
              {t("opendash:monitoring.history_options.aggregation_sum")}
            </Select.Option>

            <Select.Option value="mean">
              {t("opendash:monitoring.history_options.aggregation_mean")}
            </Select.Option>

            <Select.Option value="max">
              {t("opendash:monitoring.history_options.aggregation_max")}
            </Select.Option>

            <Select.Option value="min">
              {t("opendash:monitoring.history_options.aggregation_min")}
            </Select.Option>

            <Select.Option value="count">
              {t("opendash:monitoring.history_options.aggregation_count")}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </>
  );
}

function merge(
  current: DataFetchingOptionsInterface,
  update: Partial<DataFetchingOptionsInterface>
): DataFetchingOptionsInterface {
  return Object.assign({}, current || {}, update);
}
