import * as React from "react";

import { Button, Select, List, Menu, Drawer, Divider, Switch, Tag } from "antd";
import { Icon } from "@opendash/icons";

import {
  useDashboardsBySource,
  useDashboardCurrent,
  useTranslation,
  useUrlParam,
  AppPortal,
} from "../../..";

import { HeaderMenuItem } from "@opendash/ui";

interface Props {}

export const DashboardManagement = React.memo<Props>(
  function DashboardManagementComponent({}) {
    const t = useTranslation();

    const dashboards = useDashboardsBySource();
    const [dashboard, setDashboard] = useDashboardCurrent();

    const [editMode, setEditMode] = useUrlParam("dashboard_edit", false);
    const [datasidebar, setDatasidebar] = useUrlParam("data_sidebar", false);
    const [management, setManagement] = useUrlParam("db_management", false);
    const [create, setCreate] = useUrlParam("db_create", false);
    const [addWidgets, setAddWidgets] = useUrlParam("db_add_widgets", false);
    const [rename, setRename] = useUrlParam<string>("db_rename", null);
    const [remove, setRemove] = useUrlParam<string>("db_delete", null);

    return (
      <>
        <AppPortal place="headerAfterMenuRight">
          <Divider
            type="vertical"
            style={{ float: "left", top: 8, height: 32 }}
          />

          <HeaderMenuItem
            disabled={!dashboard}
            title={t("opendash:widgets.create.action")}
            onClick={() => setAddWidgets(true)}
            children={<Icon icon="fa:plus" />}
          />
          <HeaderMenuItem
            disabled={!dashboard}
            title={t("opendash:dashboards.editmode.action")}
            onClick={() => setEditMode(!editMode)}
            children={
              editMode ? <Icon icon="fa:lock-open" /> : <Icon icon="fa:lock" />
            }
          />

          <Divider
            type="vertical"
            style={{ float: "left", top: 8, height: 32 }}
          />

          <HeaderMenuItem
            title={t("opendash:monitoring.data_sidebar.action_desc")}
            onClick={() => setDatasidebar(true)}
            children={<Icon icon="fa:list-alt" />}
          />
        </AppPortal>
        <List
          dataSource={dashboards}
          rowKey="id"
          renderItem={(dboard) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<Icon icon="fa:pen" />}
                  title={t("opendash:dashboards.rename.action_desc")}
                  onClick={() => setRename(dboard.id)}
                />,

                <Button
                  type="link"
                  icon={<Icon icon="fa:trash" />}
                  title={t("opendash:dashboards.delete.action_desc")}
                  onClick={() => setRemove(dboard.id)}
                />,
              ]}
            >
              <div
                onClick={() => setDashboard(dboard)}
                title={t("opendash:dashboards.change.action_desc")}
                style={{ cursor: "pointer", padding: "0 24px" }}
              >
                <span>{dboard.name}</span>
                {dboard.id === dashboard?.id && (
                  <Tag
                    style={{ marginLeft: 8 }}
                    children={t("opendash:Active")}
                  />
                )}
              </div>
            </List.Item>
          )}
        />

        <Menu
          mode="inline"
          selectedKeys={editMode ? ["dashboard_edit"] : []}
          openKeys={["dashboard"]}
        >
          <Menu.SubMenu
            key="dashboard"
            title={t("opendash:dashboards.management_title")}
          >
            <Menu.Item
              key="dashboard_create"
              children={t("opendash:dashboards.create.action")}
              onClick={() => setCreate(true)}
            />
            <Menu.Item
              key="widget_create"
              disabled={!dashboard}
              children={t("opendash:widgets.create.action")}
              onClick={() => setAddWidgets(true)}
            />
            <Menu.Item
              key="dashboard_edit"
              disabled={!dashboard}
              children={t("opendash:dashboards.editmode.action")}
              onClick={() => setEditMode(!editMode)}
            />
          </Menu.SubMenu>
        </Menu>
      </>
    );
  }
);
