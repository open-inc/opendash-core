import * as React from "react";

import { AdminToolbar } from "@opendash/ui";
import { Button, Modal } from "antd";

import {
  AdminLayout,
  useTranslation,
  useImmerState,
  useMonitoringService,
  useServiceStore,
  AlarmList,
  DataSelect,
  useAlarmModal,
  useSource,
  LinkedSourcePicker,
} from "../../..";

export const AlarmManagementRoute = React.memo(function AlarmManagementRoute() {
  const t = useTranslation();

  const monitoring = useMonitoringService();

  const [state, updateState, setState, assignToState] = useImmerState({
    create: false,
    createItem: null,
    createItemDimension: 0,
    searchString: "",
  });

  const [source] = useSource();

  const allAlarms = useServiceStore(
    monitoring,
    React.useCallback((state) => state.alarms, [])
  );

  const alarms = React.useMemo(() => {
    return allAlarms.filter((alarm) => {
      const [sourceId] = alarm.item;

      return sourceId === source?.tag;
    });
  }, [allAlarms, source]);

  const [, openModal] = useAlarmModal();

  return (
    <AdminLayout>
      <AdminToolbar
        title={t("opendash:monitoring.alarms.management_title")}
        description={t("opendash:monitoring.alarms.management_description")}
        // search={state.searchString}
        // onSearch={(searchString) => assignToState({ searchString })}
        actions={[
          <Button
            key="create"
            type="primary"
            title={t("opendash:monitoring.alarms.create.action_desc")}
            onClick={() => assignToState({ create: true })}
          >
            {t("opendash:monitoring.alarms.create.action")}
          </Button>,
        ]}
        children={<LinkedSourcePicker style={{ width: "100%" }} />}
      />

      <div style={{ padding: "0 24px" }}>
        <AlarmList alarms={alarms} />
      </div>

      <Modal
        visible={!!state.create}
        title={t("opendash:monitoring.alarms.create.modal_title")}
        cancelText={t("opendash:ui.close")}
        onCancel={(e) =>
          assignToState({
            create: false,
            createItem: null,
            createItemDimension: 0,
          })
        }
        okText={t("opendash:ui.next")}
        okButtonProps={{
          disabled: !state.createItem,
        }}
        onOk={() => {
          openModal(state.createItem, state.createItemDimension);

          assignToState({
            create: false,
            createItem: null,
            createItemDimension: 0,
          });
        }}
        bodyStyle={{ padding: 0 }}
      >
        <DataSelect
          selectionOptions={{
            select: "dimension",
            max: 1,
            min: 1,
          }}
          selection={
            state.createItem
              ? [
                  [
                    state.createItem?.source,
                    state.createItem?.id,
                    state.createItemDimension,
                  ],
                ]
              : []
          }
          onSelection={(keys, items, dimensions) => {
            assignToState({
              createItem: items[0],
              createItemDimension: dimensions[0],
            });
          }}
        />
      </Modal>
    </AdminLayout>
  );
});
