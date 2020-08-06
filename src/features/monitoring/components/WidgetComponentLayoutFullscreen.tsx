import * as React from "react";

import { Dropdown, Menu, message } from "antd";

import { Icon } from "@opendash/icons";

import {
  WidgetContainer,
  WidgetHeader,
  WidgetHeaderName,
  WidgetContent,
  WidgetHeaderAction,
} from "./WidgetComponentLayoutFullscreen.layout";

import { useTranslation, WidgetBaseContextInterface } from "../../..";
import { useNavigate } from "react-router";

export const WidgetComponentLayoutFullscreen = React.memo<
  React.PropsWithChildren<WidgetBaseContextInterface>
>(function WidgetComponentLayoutFullscreen({
  children,
  widget,
  type,
  state,
  setState,
  container,
}) {
  const t = useTranslation();
  const navigate = useNavigate();

  const hasSettings =
    type?.settingsComponent || type?.dataItems || type?.dataFetching;

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetHeaderName title={widget.name || state.name}>
          {widget.name || state.name}
        </WidgetHeaderName>
        <WidgetHeaderAction>
          <Menu mode="horizontal">
            <Menu.Item
              title={t("opendash:widgets.rename_modal_tooltip")}
              onClick={(e) => setState({ rename: true })}
            >
              <Icon icon="fa:pen" />

              {t("opendash:ui.rename")}
            </Menu.Item>

            <Menu.Item
              title={t("opendash:widgets.delete_modal_tooltip")}
              onClick={(e) => setState({ delete: true })}
            >
              <Icon icon="fa:trash" />

              {t("opendash:ui.delete")}
            </Menu.Item>

            <Menu.Item
              title={t("opendash:widgets.share_modal_tooltip")}
              onClick={(e) => setState({ share: true })}
            >
              <Icon icon="fa:share-alt" />

              {t("opendash:ui.share")}
            </Menu.Item>

            <Menu.Item
              disabled={!hasSettings}
              title={t("opendash:widgets.reload_tooltip")}
              onClick={(e) => setState({ key: "" + Math.random() })}
            >
              <Icon icon="fa:sync" />

              {t("opendash:widgets.reload")}
            </Menu.Item>

            <Menu.Item
              disabled={!hasSettings}
              title={t("opendash:widgets.settings_modal_tooltip")}
              onClick={(e) => setState({ settings: true })}
            >
              <Icon icon="fa:cog" />

              {t("opendash:widgets.settings")}
            </Menu.Item>
          </Menu>
        </WidgetHeaderAction>
      </WidgetHeader>

      <WidgetContent ref={container}>{children}</WidgetContent>
    </WidgetContainer>
  );
});
