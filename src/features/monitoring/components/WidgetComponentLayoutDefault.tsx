import * as React from "react";

import { Dropdown, Menu, message } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import {
  WidgetContainer,
  WidgetHeader,
  WidgetHeaderName,
  WidgetContent,
  WidgetHeaderAction,
} from "./WidgetComponentLayoutDefault.layout";

import { useTranslation, WidgetBaseContextInterface } from "../../..";

export const WidgetComponentLayoutDefault = React.memo<
  React.PropsWithChildren<WidgetBaseContextInterface>
>(function WidgetComponentLayoutComponent({
  children,
  widget,
  type,
  state,
  setState,
  container,
}) {
  const [t] = useTranslation(["opendash"]);

  const hasSettings =
    type?.settingsComponent || type?.dataItems || type?.dataHistory;

  return (
    <WidgetContainer>
      <WidgetHeader>
        <Dropdown
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item
                title={t("widgets.rename_modal_tooltip")}
                onClick={(e) => setState({ rename: true })}
              >
                <EditOutlined />

                {t("ui.rename")}
              </Menu.Item>

              <Menu.Item
                title={t("widgets.delete_modal_tooltip")}
                onClick={(e) => setState({ delete: true })}
              >
                <DeleteOutlined />

                {t("ui.delete")}
              </Menu.Item>

              <Menu.Item
                title={t("widgets.share_modal_tooltip")}
                onClick={(e) => setState({ share: true })}
              >
                <ShareAltOutlined />

                {t("ui.share")}
              </Menu.Item>

              <Menu.Item
                title={t("widgets.fullscreen_tooltip")}
                onClick={(e) => {
                  message.info("Coming soon..");
                }}
              >
                <FullscreenOutlined />

                {t("widgets.fullscreen_action")}
              </Menu.Item>

              <Menu.Item
                disabled={!hasSettings}
                title={t("widgets.reload_tooltip")}
                onClick={(e) => setState({ key: "" + Math.random() })}
              >
                <ReloadOutlined />

                {t("widgets.reload")}
              </Menu.Item>

              <Menu.Item
                disabled={!hasSettings}
                title={t("widgets.settings_modal_tooltip")}
                onClick={(e) => setState({ settings: true })}
              >
                <SettingOutlined />

                {t("widgets.settings")}
              </Menu.Item>
            </Menu>
          }
        >
          <WidgetHeaderAction>
            <MoreOutlined />
          </WidgetHeaderAction>
        </Dropdown>

        <WidgetHeaderName title={widget.name || state.name}>
          {widget.name || state.name}
        </WidgetHeaderName>
      </WidgetHeader>

      <WidgetContent ref={container}>{children}</WidgetContent>
    </WidgetContainer>
  );
});
