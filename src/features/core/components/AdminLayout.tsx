import * as React from "react";

import { Icon } from "@opendash/icons";

import { Layout, Menu } from "antd";

import { useTranslation, useNavigation, Boundary } from "../../..";
// import { Breadcrumb } from "../../..";
import { useNavigate } from "react-router-dom";

export const AdminLayout: React.FC = ({ children }) => {
  const [t] = useTranslation(["openware", "opendash"]);
  const navigate = useNavigate();

  const [groups, , activeItems] = useNavigation("sidebar");

  return (
    <div style={{ padding: "50px" }}>
      {/* <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb> */}
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Layout.Sider width={300} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            selectedKeys={activeItems}
            defaultOpenKeys={groups.map((group) => group.id)}
            style={{ height: "100%" }}
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
        <Layout.Content style={{ padding: "0 24px" }}>
          <Boundary>{children}</Boundary>
        </Layout.Content>
      </Layout>
    </div>
  );
};
