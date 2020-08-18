import * as React from "react";

import { Layout } from "antd";

import { Boundary, NavigationMenu, useElementSize, AppSidebar } from "../../..";

interface Props extends React.PropsWithChildren<{}> {
  contentPadding?: boolean;
}

export const AdminLayout = React.memo<Props>(function AdminLayout({
  children,
  contentPadding = false,
}) {
  const { width } = useElementSize({ current: window?.document?.body }, 100);

  const isMobile = width < 1200;

  return (
    <Layout style={{ background: "#fff" }}>
      {isMobile && <AppSidebar />}
      {!isMobile && (
        <Layout.Sider width={300} style={{ background: "#fff" }}>
          <NavigationMenu style={{ height: "100%" }} />
        </Layout.Sider>
      )}
      <Layout.Content style={contentPadding ? { padding: 24 } : {}}>
        <Boundary>{children}</Boundary>
      </Layout.Content>
    </Layout>
  );
});
