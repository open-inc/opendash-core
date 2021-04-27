import * as React from "react";

import styled from "styled-components";

import { Button, List, Menu, Tag } from "antd";
import { Icon } from "@opendash/icons";

import {
  useDashboardsBySource,
  useDashboardCurrent,
  useTranslation,
  useUrlParam,
  AppSidebar,
  createInternalComponent,
  useMonitoringService,
} from "../../..";

const DashboardMenuContainer = styled.div`
  .ant-menu-submenu-selected {
    color: inherit;
  }
`;

const DashboardButtonContainer = styled.div`
  float: right;

  .ant-btn-icon-only,
  .ant-btn-icon-only > * {
    font-size: 13px;
  }
`;

interface Props {}

export const DashboardManagement = createInternalComponent<Props>(
  function DashboardManagement({}) {
    const t = useTranslation();

    const MonitoringService = useMonitoringService();

    const dashboards = useDashboardsBySource();
    const [currentDashboard, setDashboard] = useDashboardCurrent();

    const [editMode, setEditMode] = useUrlParam("dashboard_edit", false);
    const [datasidebar, setDatasidebar] = useUrlParam("data_sidebar", false);
    const [create, setCreate] = useUrlParam("db_create", false);
    const [addWidgets, setAddWidgets] = useUrlParam("db_add_widgets", false);
    const [rename, setRename] = useUrlParam<string>("db_rename", null);
    const [remove, setRemove] = useUrlParam<string>("db_delete", null);

    return (
      <>
        <AppSidebar showSourcePicker={true}>
          <DashboardMenuContainer>
            <Menu
              mode="inline"
              selectedKeys={[currentDashboard?.id]}
              openKeys={["dashboard"]}
            >
              <Menu.SubMenu
                key="dashboard"
                title={
                  <span>
                    {t("opendash:monitoring.dashboards.title")}

                    <DashboardButtonContainer>
                      <Button
                        type="link"
                        icon={<Icon icon="fa:plus" />}
                        title={t("opendash:dashboards.create.action")}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCreate(true);
                        }}
                      />
                    </DashboardButtonContainer>
                  </span>
                }
              >
                {dashboards.map((dashboard) => (
                  <Menu.Item
                    key={dashboard.id}
                    children={
                      <span>
                        {dashboard.name}

                        <DashboardButtonContainer>
                          <Button
                            type="link"
                            icon={<Icon icon="fa:pen" />}
                            title={t("opendash:dashboards.rename.action_desc")}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setRename(dashboard.id);
                            }}
                          />
                          <Button
                            type="link"
                            icon={<Icon icon="fa:trash" />}
                            title={t("opendash:dashboards.delete.action_desc")}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setRemove(dashboard.id);
                            }}
                          />
                        </DashboardButtonContainer>
                      </span>
                    }
                    title={t("opendash:dashboards.change.action_desc")}
                    onClick={() => setDashboard(dashboard)}
                  />
                ))}
              </Menu.SubMenu>
            </Menu>
          </DashboardMenuContainer>
          <DashboardMenuContainer>
            <Menu
              mode="inline"
              // style={{ width: "100%" }}
              selectedKeys={[
                ...(addWidgets ? ["widget_create"] : []),
                ...(create ? ["dashboard_create"] : []),
                ...(editMode ? ["dashboard_edit"] : []),
              ]}
              openKeys={["dashboard"]}
            >
              <Menu.SubMenu
                key="dashboard"
                title={t("opendash:monitoring.widgets.title")}
              >
                <Menu.Item
                  key="widget_create"
                  disabled={!currentDashboard}
                  children={t("opendash:widgets.create.action")}
                  onClick={() => {
                    setAddWidgets(true);
                  }}
                />
                <Menu.Item
                  key="dashboard_edit"
                  disabled={!currentDashboard}
                  children={t("opendash:dashboards.editmode.action")}
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                />
              </Menu.SubMenu>
            </Menu>
          </DashboardMenuContainer>
        </AppSidebar>

        {/* <Divider
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
          /> */}
      </>
    );
  }
);
