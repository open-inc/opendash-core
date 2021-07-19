import * as React from "react";

import { Icon } from "@opendash/icons";
import { HeaderMenuItem } from "@opendash/ui";

import {
  useDashboardCurrent,
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
  createInternalComponent,
  AppPortal,
} from "../../..";

type Props = React.PropsWithChildren<{}>;

export const MonitoringGlobals = createInternalComponent<Props>(
  function MonitoringGlobals({ children }) {
    const t = useTranslation();
    const { MonitoringService } = useOpenDashServices();

    const [dashboard, setDashboard] = useDashboardCurrent();

    const [datasidebar, setDatasidebar] = useUrlParam("data_sidebar", false);
    const [create, setCreate] = useUrlParam("db_create", false);
    const [addWidgets, setAddWidgets] = useUrlParam("db_add_widgets", false);
    const [rename, setRename] = useUrlParam<string>("db_rename", null);
    const [remove, setRemove] = useUrlParam<string>("db_delete", null);

    const [[alarmItem, alarmDimension], setAddAlarm] = useAlarmModal();

    return (
      <React.Fragment>
        {children}

        <AppPortal place="headerBeforeMenuRight">
          <HeaderMenuItem
            onClick={() => {
              setDatasidebar(true);
            }}
          >
            <Icon icon="fa:table" />
          </HeaderMenuItem>
        </AppPortal>

        {/* Modals */}
        <DataSidebar open={datasidebar} close={() => setDatasidebar(false)} />

        <WidgetCreationModal
          open={addWidgets}
          close={() => setAddWidgets(false)}
          onSave={(presets) => {
            MonitoringService.addPresetsToDashboard(dashboard, presets);
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
  }
);
