import * as React from "react";

import { useRoutes } from "react-router-dom";

import { useAppState, useOpenDashApp, useServicesSuspense } from "../../..";

import {
  Boundary,
  OpenDashAuth,
  OpenDashFrontpage,
  MonitoringRoute,
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

  return <AppRouter />;
}

function AppRouter() {
  const app = useOpenDashApp();

  const routes = React.useMemo(() => {
    return [
      ...app.routes.map((route) => {
        return {
          path: route.path,
          element: React.createElement(
            React.lazy(route.component),
            route.props || {}
          ),
        };
      }),

      { path: "/", element: <OpenDashFrontpage /> },
      { path: "monitoring*", element: <MonitoringRoute /> },
      { path: "*", element: <OpenDashDefaultRoute /> },
    ];
  }, []);

  return useRoutes(routes, "");
}
