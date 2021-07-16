import * as React from "react";

import { List, Button, message, Modal } from "antd";
import { Icon } from "@opendash/icons";

import produce from "immer";

import {
  AlarmInterface,
  createInternalComponent,
  useDataItem,
  useTranslation,
  useMonitoringService,
  useOpenDashServices,
} from "../../..";

interface ListProps {
  alarms: AlarmInterface[];
}

interface ItemProps {
  alarm: AlarmInterface;
}

const AlarmListItem = createInternalComponent<ItemProps>(
  function AlarmListItem({ alarm }) {
    const t = useTranslation();
    const { DataService } = useOpenDashServices();
    const MonitoringService = useMonitoringService();

    const item = useDataItem(alarm.item[0], alarm.item[1]);

    const title = DataService.getItemName(item, alarm.item[2]);

    let description = t(
      "opendash:monitoring.alarms.trigger." + alarm.trigger.type
    );

    if ("string" in alarm.trigger) {
      description += ` '${alarm.trigger.string}'`;
    }

    if ("value" in alarm.trigger) {
      description += ` ${alarm.trigger.value}`;
    }

    if ("min" in alarm.trigger && "max" in alarm.trigger) {
      description += ` ${alarm.trigger.min} - ${alarm.trigger.max}`;
    }

    if (alarm.action?.label) {
      description += ` - ${alarm.action?.label}`;
    }

    function deleteAlarm() {
      Modal.confirm({
        title: t("opendash:monitoring.alarms.delete.confirm_title"),
        content: t("opendash:monitoring.alarms.delete.confirm_message"),
        okText: t("opendash:monitoring.alarms.delete.confirm_ok"),
        okType: "danger",
        // cancelText: t("opendash:monitoring.alarms.delete.confirm_cancel"),
        onOk: () => {
          MonitoringService.deleteAlarm(alarm).then(
            (ok) => {
              message.success(t("opendash:monitoring.alarms.delete.success"));
            },
            (error) => {
              message.error(t("opendash:monitoring.alarms.delete.error"));
            }
          );
        },
      });
    }

    return (
      <List.Item
        actions={[
          <Button
            type="link"
            icon={<Icon icon="fa:trash" />}
            onClick={deleteAlarm}
          />,
        ]}
      >
        <List.Item.Meta title={title} description={description} />
      </List.Item>
    );
  }
);

export const AlarmList = createInternalComponent<ListProps>(function AlarmList({
  alarms,
}) {
  const t = useTranslation();

  return (
    <List
      dataSource={alarms}
      renderItem={(alarm) => <AlarmListItem alarm={alarm} />}
    />
  );
});
