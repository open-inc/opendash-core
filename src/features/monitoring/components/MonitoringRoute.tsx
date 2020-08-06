import * as React from "react";

import { Routes, Route } from "react-router-dom";

import {
  MonitoringGlobals,
  DashboardRoute,
  OpenDashDefaultRoute,
  ExplorerRoute,
  WidgetRoute,
} from "../../..";

export const MonitoringRoute = React.memo(function MonitoringRoute() {
  return (
    <MonitoringGlobals>
      <Routes>
        <Route path="dashboards" element={<DashboardRoute />} />
        <Route path="widgets/:id" element={<WidgetRoute />} />
        <Route path="explore" element={<ExplorerRoute />} />
        <Route path="*" element={<OpenDashDefaultRoute />} />
      </Routes>
    </MonitoringGlobals>
  );
});
