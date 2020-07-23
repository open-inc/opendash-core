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
  const t = useTranslation();

  const dashboards = useDashboardsBySource();
  const [dashboard, setDashboard] = useDashboardCurrent();

  const [, setCreate] = useUrlParam("db_create", false);

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
    </DashboardLayout>
  );
};
