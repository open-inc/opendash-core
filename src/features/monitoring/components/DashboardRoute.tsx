import * as React from "react";

import {
  useDashboardCurrent,
  useDashboardsBySource,
  useOpenDashServices,
  WidgetCreationModal,
  DashboardLayout,
  DashboardCreationModal,
  DashboardRenamingModal,
  DashboardDeletionModal,
  DataSidebar,
  useTranslation,
  useUrlParam,
} from "../../..";

import { DashboardDisplay } from "./DashboardDisplay";

interface Props {}

export const DashboardRoute: React.FC<Props> = () => {
  const [t] = useTranslation(["opendash"]);
  const { DashboardService } = useOpenDashServices();

  const dashboards = useDashboardsBySource();
  const [dashboard, setDashboard] = useDashboardCurrent();

  const [editMode, setEditMode] = useUrlParam("dashboard_edit", false);
  const [datasidebar, setDatasidebar] = useUrlParam("data_sidebar", false);
  const [management, setManagement] = useUrlParam("db_management", false);
  const [create, setCreate] = useUrlParam("db_create", false);
  const [addWidgets, setAddWidgets] = useUrlParam("db_add_widgets", false);
  const [rename, setRename] = useUrlParam<string>("db_rename", null);
  const [remove, setRemove] = useUrlParam<string>("db_delete", null);

  // Create a new dashboard, if there is none
  React.useEffect(() => {
    if (!dashboard) {
      if (dashboards.length === 0) {
        setCreate(true);
      } else {
        setDashboard(dashboards[0]);
      }
    }
  }, [dashboards]);

  return (
    <DashboardLayout>
      <DashboardDisplay dashboard={dashboard} />

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
    </DashboardLayout>
  );
};

// {/* <ActionBar>
//   <ActionBarLeft>
//     <Popover
//       placement="bottomRight"
//       content={
//         <div style={{ width: Math.min(600, window.innerWidth) }}>
//           <DashboardManagement />
//         </div>
//       }
//       title={t("dashboards.management_title")}
//       trigger="click"
//     >
//       <Button children={t("dashboards.management_title")} />
//     </Popover>
//   </ActionBarLeft>
//   <ActionBarRight>
//     <Button
//       style={{ marginLeft: 8 }}
//       children={t("monitoring.data_sidebar.action")}
//       title={t("monitoring.data_sidebar.action_desc")}
//       onClick={() => setDatasidebar(true)}
//     />

//     <LinkedDataSelect style={{ marginLeft: 8 }} />
//   </ActionBarRight>
// </ActionBar> */}
