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
      {/* <AppPortal place="headerBeforeMenuLeft">
        <div style={{ paddingTop: 6, paddingRight: 10 }}>
          <Hamburger open={open} setOpen={setOpen} />
        </div>
      </AppPortal> */}
      <Layout style={{ minHeight: "calc(100vh - 96px)", padding: 0 }}>
        <Layout.Sider
          collapsible={true}
          collapsed={!open}
          collapsedWidth={0}
          zeroWidthTriggerStyle={{ display: "none" }}
          width={Math.min(400, window.innerWidth)}
          style={{ background: "#fff" }}
        >
          <DashboardManagement />

          <Menu
            mode="inline"
            selectedKeys={activeItems}
            defaultOpenKeys={groups.map((group) => group.id)}
          >
            {groups.map((group) => (
              <Menu.SubMenu
                key={group.id}
                title={
                  <span>
                    {group.icon && <Icon icon={group.icon} />} {group.label}
                  </span>
                }
              >
                {group.children.map((route) => (
                  <Menu.Item
                    key={route.id}
                    onClick={(e) => navigate(route.link)}
                  >
                    {route.icon && <Icon icon={route.icon} />} {route.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <Boundary>{children}</Boundary>
        </Layout.Content>
      </Layout>
    </>
  );
});
