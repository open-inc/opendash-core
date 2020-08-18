import * as React from "react";

import { Icon } from "@opendash/icons";

import { Layout, Menu } from "antd";

import {
  AppPortal,
  Hamburger,
  DashboardManagement,
  useTranslation,
  useNavigation,
  Boundary,
} from "../../..";

import { useNavigate } from "react-router-dom";

export const DashboardLayout = React.memo(function DashboardLayoutComponent({
  children,
}) {
  const t = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [groups, , activeItems] = useNavigation("sidebar");

  return (
    <>
      <DashboardManagement />
      <Layout>
        <Layout.Content>
          <Boundary>{children}</Boundary>
        </Layout.Content>
      </Layout>
    </>
  );
});
