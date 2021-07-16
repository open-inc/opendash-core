import * as React from "react";

import produce from "immer";
import { message } from "antd";

import {
  AlarmInterface,
  useTranslation,
  FormGenerator,
  DataItemInterface,
  createInternalComponent,
  useUserService,
  useServiceStore,
  useMonitoringService,
} from "../../..";

interface Props {
  item: DataItemInterface;
  dimension: number;
  onSave?: (id: string) => void;
}

function getEmptyAlarm(
  item: DataItemInterface,
  dimension: number
): Omit<AlarmInterface, "id"> {
  const alarm = {
    item: [item.source, item.id, dimension],
    trigger: {},
    action: {},
  };

  // This will be fixed by the form default values
  // @ts-ignore
  return alarm;
}

export const AlarmCreate = createInternalComponent<Props>(function AlarmCreate({
  item,
  dimension = 0,
  onSave,
}) {
  const t = useTranslation();
  const MonitoringService = useMonitoringService();
  const UserService = useUserService();

  const [alarm, setAlarm] = React.useState<Omit<AlarmInterface, "id">>(
    getEmptyAlarm(item, dimension)
  );

  const defaultEmail = useServiceStore(
    UserService,
    (state) => state.currentUser?.email
  );

  React.useEffect(() => {
    setAlarm(getEmptyAlarm(item, dimension));
  }, [item?.source, item?.id, dimension]);

  const type = item?.valueTypes[dimension].type;

  const triggerTypes = MonitoringService.triggerTypes.filter((value) =>
    value.startsWith(type?.toLowerCase())
  );

  const actionTypes = MonitoringService.actionTypes.filter((value) => {
    if (MonitoringService.devices.length === 0 && value === "notification") {
      return false;
    }

    if (MonitoringService.listWebhooks().length === 0 && value === "webhook") {
      return false;
    }

    return true;
  });

  return (
    <>
      <p>{t("opendash:monitoring.alarms.trigger.description")}</p>

      <FormGenerator
        state={alarm.trigger}
        updateState={(key, value) => {
          setAlarm(
            produce((draft) => {
              draft.trigger[key] = value;
            })
          );
        }}
        settings={{
          removeHidden: true,
        }}
        elements={[
          {
            key: "type",
            type: "select",
            label: t(
              "opendash:monitoring.alarms.trigger.select_type_placeholder"
            ),
            defaultValue: triggerTypes[0],
            settings: {
              options: triggerTypes.map((value) => ({
                value,
                label: t("opendash:monitoring.alarms.trigger." + value),
              })),
            },
          },
          {
            key: "value",
            type: "input.number",
            label: t(
              "opendash:monitoring.alarms.trigger.select_value_placeholder"
            ),
            defaultValue: 10,
            visible: (state) =>
              [
                "number_equals",
                "number_equals_not",
                "number_gt",
                "number_lt",
              ].includes(state.type),
          },
          {
            key: "min",
            type: "input.number",
            label: t(
              "opendash:monitoring.alarms.trigger.select_min_placeholder"
            ),
            defaultValue: 10,
            visible: (state) =>
              ["number_in_range", "number_out_of_range"].includes(state.type),
          },
          {
            key: "max",
            type: "input.number",
            label: t(
              "opendash:monitoring.alarms.trigger.select_max_placeholder"
            ),
            defaultValue: 100,
            visible: (state) =>
              ["number_in_range", "number_out_of_range"].includes(state.type),
          },
          {
            key: "string",
            type: "input",
            label: t(
              "opendash:monitoring.alarms.trigger.select_string_placeholder"
            ),
            defaultValue: "",
            visible: (state) =>
              [
                "string_equals",
                "string_equals_not",
                "string_includes",
                "string_includes_not",
                "string_starts_with",
                "string_starts_with_not",
                "string_ends_with",
                "string_ends_with_not",
              ].includes(state.type),
          },
          {
            key: "interval",
            type: "select",
            label: t(
              "opendash:monitoring.alarms.trigger.select_interval_placeholder"
            ),
            defaultValue: 0,
            settings: {
              options: [
                {
                  label: t(
                    "opendash:monitoring.alarms.trigger.interval_everytime"
                  ),
                  value: 0,
                },
                {
                  label: t(
                    "opendash:monitoring.alarms.trigger.interval_once_per_hour"
                  ),
                  value: 1000 * 60 * 60,
                },
                {
                  label: t(
                    "opendash:monitoring.alarms.trigger.interval_once_per_day"
                  ),
                  value: 1000 * 60 * 60 * 24,
                },
                {
                  label: t(
                    "opendash:monitoring.alarms.trigger.interval_once_per_week"
                  ),
                  value: 1000 * 60 * 60 * 24 * 7,
                },
                {
                  label: t(
                    "opendash:monitoring.alarms.trigger.interval_once_per_month"
                  ),
                  value: 1000 * 60 * 60 * 24 * 7 * 4,
                },
              ],
            },
          },
        ]}
      />

      <p>{t("opendash:monitoring.alarms.action.description")}</p>

      <FormGenerator
        state={alarm.action}
        updateState={(key, value) => {
          setAlarm(
            produce((draft) => {
              draft.action[key] = value;
            })
          );
        }}
        settings={{
          removeHidden: true,
        }}
        submit={{
          children: t("opendash:monitoring.alarms.create.submit"),
        }}
        onSubmit={() => {
          MonitoringService.createAlarm(alarm).then(
            (id) => {
              message.success(t("opendash:monitoring.alarms.create.success"));
              onSave(id);
            },
            (error) => {
              message.error(t("opendash:monitoring.alarms.create.error"));
            }
          );
        }}
        elements={[
          {
            key: "objectId",
            type: "select",
            label: t("opendash:monitoring.alarms.action.select"),
            defaultValue: actionTypes[0],
            settings: {
              options: actionTypes.map((value) => ({
                value,
                label: t("opendash:monitoring.alarms.action." + value),
              })),
            },
          },
          // {
          //   key: "type",
          //   type: "select",
          //   label: t("opendash:monitoring.alarms.action.select"),
          //   defaultValue: actionTypes[0],
          //   settings: {
          //     options: actionTypes.map((value) => ({
          //       value,
          //       label: t("opendash:monitoring.alarms.action." + value),
          //     })),
          //   },
          // },
          // {
          //   key: "email",
          //   type: "input",
          //   label: t("opendash:monitoring.alarms.action.email"),
          //   defaultValue: defaultEmail,
          //   visible: (state) => state.type === "email",
          // },
          // {
          //   key: "device ",
          //   type: "select",
          //   label: t("opendash:monitoring.alarms.action.notification"),
          //   visible: (state) => state.type === "notification",
          //   defaultValue: MonitoringService.devices[0]?.id,
          //   settings: {
          //     options: MonitoringService.devices.map((device) => ({
          //       value: device.id,
          //       label: device.name,
          //     })),
          //   },
          // },
          // {
          //   key: "webhook",
          //   type: "select",
          //   label: t("opendash:monitoring.alarms.action.webhook"),
          //   visible: (state) => state.type === "webhook",
          //   defaultValue: MonitoringService.listWebhooks()[0]?.id,
          //   settings: {
          //     options: MonitoringService.listWebhooks().map((webhook) => ({
          //       value: webhook.id,
          //       label: webhook.name,
          //     })),
          //   },
          // },
        ]}
      />
    </>
  );
});
