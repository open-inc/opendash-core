import * as React from "react";

import { useTranslation, useNavigation } from "../../..";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@opendash/icons";
import { MenuProps } from "antd/lib/menu";

interface Props extends MenuProps {}

export const NavigationMenu = React.memo<Props>(function NavigationMenu(props) {
  const t = useTranslation();
  const navigate = useNavigate();

  const [groups, , activeItems] = useNavigation("sidebar");

  return (
    <Menu
      mode="inline"
      selectedKeys={activeItems}
      defaultOpenKeys={groups.map((group) => group.id)}
      {...props}
    >
      {groups.map((group) => (
        <Menu.SubMenu
          key={group.id}
          title={
            <span>
              {group.icon && <Icon icon={group.icon} />} {t(group.label)}
            </span>
          }
        >
          {group.children.map((route) => (
            <Menu.Item key={route.id} onClick={(e) => navigate(route.link)}>
              {route.icon && <Icon icon={route.icon} />} {t(route.label)}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
});
