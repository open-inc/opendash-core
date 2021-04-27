import * as React from "react";

import { List, Button, message, Modal } from "antd";
import { Icon } from "@opendash/icons";

import produce from "immer";

import {
  AlarmInterface,
  createInternalComponent,
  DataItemDimensionIdentifierInterface,
  useDataItem,
  useOpenDashServices,
  useTranslation,
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
    const { AlarmService } = useOpenDashServices();

    const item = useDataItem(alarm.item[0], alarm.item[1]);

    let title = t("opendash:monitoring.alarms.trigger." + alarm.trigger.type);

    if ("string" in alarm.trigger) {
      title += ` '${alarm.trigger.string}'`;
    }

    if ("value" in alarm.trigger) {
      title += ` ${alarm.trigger.value}`;
    }

    if ("min" in alarm.trigger && "max" in alarm.trigger) {
      title += ` ${alarm.trigger.min} - ${alarm.trigger.max}`;
    }

    let description = t(
      "opendash:monitoring.alarms.action." + alarm.action.type
    );

    if ("email" in alarm.action && alarm.action.email !== undefined) {
      description += ` (${alarm.action.email})`;
    }

    if ("webhook" in alarm.action) {
      const webhook = AlarmService.webhooks.find(
        // @ts-ignore
        (webhook) => webhook.id === alarm.action.webhook
      );
      description += ` (${webhook.name})`;
    }

    function deleteAlarm() {
      Modal.confirm({
        title: t("opendash:monitoring.alarms.delete.confirm_title"),
        content: t("opendash:monitoring.alarms.delete.confirm_message"),
        okText: t("opendash:monitoring.alarms.delete.confirm_ok"),
        okType: "danger",
        // cancelText: t("opendash:monitoring.alarms.delete.confirm_cancel"),
        onOk: () => {
          AlarmService.deleteAlarm(alarm).then(
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
