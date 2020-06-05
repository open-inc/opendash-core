import * as React from "react";

import { Modal, Tabs } from "antd";

import produce from "immer";

import {
  AlarmInterface,
  DataItemDimensionIdentifierInterface,
  useDataItem,
  useOpenDashServices,
  useTranslation,
  AlarmList,
  AlarmCreate,
  useAlarmsForItem,
  DataItemInterface,
} from "../../..";

interface Props {
  item: DataItemInterface;
  dimension: number;
  open: boolean;
  close: () => void;
  onSave?: (id: string) => void;
}

function getEmptyAlarm(
  identifier: DataItemDimensionIdentifierInterface
): Omit<AlarmInterface, "id"> {
  const alarm = {
    item: identifier,
    trigger: {},
    action: {},
  };

  // This will be fixed by the form default values
  // @ts-ignore
  return alarm;
}

export const AlarmModal = React.memo<Props>(function AlarmModal({
  item,
  dimension,
  open,
  close,
  onSave,
}) {
  const [t] = useTranslation(["opendash"]);

  const { AlarmService, DataService } = useOpenDashServices();

  const alarms = useAlarmsForItem(item, dimension);

  const [tab, setTab] = React.useState("list");

  React.useEffect(() => {
    if (tab === "list" && alarms.length === 0) {
      setTab("create");
    }
  }, [tab, alarms.length]);

  return (
    <Modal
      visible={open}
      title={
        item &&
        t("monitoring.alarms.modal_title", {
          name: DataService.getItemName(item, dimension),
        })
      }
      cancelText={t("ui.close")}
      onCancel={(e) => close()}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      // okButtonProps={{ disabled: !name }}
    >
      <Tabs
        activeKey={tab}
        onChange={(nextTab) => setTab(nextTab)}
        destroyInactiveTabPane={true}
      >
        <Tabs.TabPane
          disabled={alarms.length === 0}
          tab={t("monitoring.alarms.modal.tab_list")}
          key="list"
        >
          {item && <AlarmList alarms={alarms} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={t("monitoring.alarms.modal.tab_create")}
          key="create"
        >
          {item && (
            <AlarmCreate
              item={item}
              dimension={dimension}
              onSave={() => {
                setTab("list");
              }}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
});
