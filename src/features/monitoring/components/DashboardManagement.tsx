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
    const [t] = useTranslation(["opendash"]);

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
            title={t("widgets.create.action")}
            onClick={() => setAddWidgets(true)}
            children={<Icon icon="fa:plus" />}
          />
          <HeaderMenuItem
            disabled={!dashboard}
            title={t("dashboards.editmode.action")}
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
            title={t("monitoring.data_sidebar.action_desc")}
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
                  title={t("dashboards.rename.action_desc")}
                  onClick={() => setRename(dboard.id)}
                />,

                <Button
                  type="link"
                  icon={<Icon icon="fa:trash" />}
                  title={t("dashboards.delete.action_desc")}
                  onClick={() => setRemove(dboard.id)}
                />,
              ]}
            >
              <div
                onClick={() => setDashboard(dboard)}
                title={t("dashboards.change.action_desc")}
                style={{ cursor: "pointer", padding: "0 24px" }}
              >
                <span>{dboard.name}</span>
                {dboard.id === dashboard?.id && (
                  <Tag style={{ marginLeft: 8 }} children={t("Active")} />
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
            title={t("dashboards.management_title")}
          >
            <Menu.Item
              key="dashboard_create"
              children={t("dashboards.create.action")}
              onClick={() => setCreate(true)}
            />
            <Menu.Item
              key="widget_create"
              disabled={!dashboard}
              children={t("widgets.create.action")}
              onClick={() => setAddWidgets(true)}
            />
            <Menu.Item
              key="dashboard_edit"
              disabled={!dashboard}
              children={t("dashboards.editmode.action")}
              onClick={() => setEditMode(!editMode)}
            />
          </Menu.SubMenu>
        </Menu>
      </>
    );
  }
);
