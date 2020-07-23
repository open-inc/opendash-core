import * as React from "react";

import {
  useDashboardCurrent,
  useDashboardsBySource,
  useOpenDashServices,
  WidgetCreationModal,
  AlarmModal,
  DashboardCreationModal,
  DashboardRenamingModal,
  DashboardDeletionModal,
  DataSidebar,
  useTranslation,
  useUrlParam,
  useAlarmModal,
} from "../../..";

interface Props {}

export const MonitoringGlobals: React.FC<Props> = ({ children }) => {
  const t = useTranslation();
  const { DashboardService } = useOpenDashServices();

  const dashboards = useDashboardsBySource();
  const [dashboard, setDashboard] = useDashboardCurrent();

  const [editMode, setEditMode] = useUrlParam("dashboard_edit", false);
  const [datasidebar, setDatasidebar] = useUrlParam("data_sidebar", false);
  const [create, setCreate] = useUrlParam("db_create", false);
  const [addWidgets, setAddWidgets] = useUrlParam("db_add_widgets", false);
  const [rename, setRename] = useUrlParam<string>("db_rename", null);
  const [remove, setRemove] = useUrlParam<string>("db_delete", null);

  const [[alarmItem, alarmDimension], setAddAlarm] = useAlarmModal();

  return (
    <React.Fragment>
      {children}

      {/* Modals */}
      <DataSidebar open={datasidebar} close={() => setDatasidebar(false)} />

      <WidgetCreationModal
        open={addWidgets}
        close={() => setAddWidgets(false)}
        onSave={(presets) => {
          DashboardService.addPresetsToDashboard(dashboard, presets);
        }}
      />

      <DashboardCreationModal
        open={create}
        close={() => setCreate(false)}
        onSave={(dashboardId) => {
          // TODO:
          // @ts-ignore
          setDashboard({ id: dashboardId });
        }}
      />

      <DashboardRenamingModal
        id={rename}
        open={!!rename}
        close={() => setRename(null)}
      />

      <DashboardDeletionModal
        id={remove}
        open={!!remove}
        close={() => setRemove(null)}
      />

      <AlarmModal
        key={JSON.stringify(alarmItem)}
        item={alarmItem}
        dimension={alarmDimension}
        open={!!alarmItem}
        close={() => setAddAlarm(undefined)}
      />
    </React.Fragment>
  );
};
