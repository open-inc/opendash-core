import * as React from "react";

import { Navigate, useRoutes } from "react-router-dom";

import {
  useAppState,
  useOpenDashApp,
  useServicesSuspense,
  DataGlobals,
} from "../../..";

import {
  Boundary,
  OpenDashAuth,
  OpenDashFrontpage,
  MonitoringRoute,
  DataItemOverviewRoute,
  DataItemRenameRoute,
  OpenDashDefaultRoute,
  OpenDashProvider,
} from "../../..";

import Layout from "./_layout";

const css = `
  .ant-table-wrapper {
    overflow: auto;
  }
`;

export function OpenDashApp({ app }) {
  return (
    <Boundary>
      <OpenDashProvider app={app}>
        <Boundary>
          <Layout>
            <Boundary>
              <AppGuard />
            </Boundary>
          </Layout>
        </Boundary>
      </OpenDashProvider>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </Boundary>
  );
}

function AppGuard() {
  useServicesSuspense();

  const user = useAppState((state) => state.user.current);

  if (!user) {
    return <OpenDashAuth />;
  }

  return (
    <DataGlobals>
      <AppRouter />
    </DataGlobals>
  );
}

function AppRouter() {
  const app = useOpenDashApp();

  const routes = React.useMemo(() => {
    return [
      ...app.routes.map((route) => {
        if ("component" in route) {
          return {
            path: route.path,
            element: React.createElement(
              React.lazy(route.component),
              route.props || {}
            ),
          };
        }

        if ("redirectPath" in route) {
          return {
            path: route.path,
            element: <Navigate to={route.redirectPath} />,
          };
        }

        return null;
      }),

      { path: "/", element: <OpenDashFrontpage /> },
      { path: "monitoring*", element: <MonitoringRoute /> },
      {
        path: "account/data-item-rename",
        element: <DataItemRenameRoute />,
      },
      {
        path: "account/data-item-overview",
        element: <DataItemOverviewRoute />,
      },
      { path: "*", element: <OpenDashDefaultRoute /> },
    ].filter((x) => !!x);
  }, []);

  return useRoutes(routes, "");
}
