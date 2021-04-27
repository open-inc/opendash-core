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

import {
  createInternalComponent,
  useTranslation,
  WidgetContext,
} from "../../..";
import { useNavigate } from "react-router";
import { useServiceStore } from "../../react-helper/useServiceStore";

export const WidgetComponentLayoutFullscreen = createInternalComponent<
  React.PropsWithChildren<{ context: WidgetContext }>
>(function WidgetComponentLayoutFullscreen({ children, context }) {
  const t = useTranslation();

  const name = useServiceStore(context, (state) => state.name);

  const hasSettings =
    context.type?.settingsComponent ||
    context.type?.dataItems ||
    context.type?.dataFetching;

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetHeaderName title={context.widget.name || name}>
          {context.widget.name || name}
        </WidgetHeaderName>
        <WidgetHeaderAction>
          <Menu mode="horizontal">
            <Menu.Item
              title={t("opendash:widgets.rename_modal_tooltip")}
              onClick={(e) => {
                context.store.update((state) => {
                  state.rename = true;
                });
              }}
            >
              <Icon icon="fa:pen" />

              {t("opendash:ui.rename")}
            </Menu.Item>

            <Menu.Item
              title={t("opendash:widgets.delete_modal_tooltip")}
              onClick={(e) => {
                context.store.update((state) => {
                  state.delete = true;
                });
              }}
            >
              <Icon icon="fa:trash" />

              {t("opendash:ui.delete")}
            </Menu.Item>

            <Menu.Item
              title={t("opendash:widgets.share_modal_tooltip")}
              onClick={(e) => {
                context.store.update((state) => {
                  state.share = true;
                });
              }}
            >
              <Icon icon="fa:share-alt" />

              {t("opendash:ui.share")}
            </Menu.Item>

            <Menu.Item
              disabled={!hasSettings}
              title={t("opendash:widgets.reload_tooltip")}
              onClick={(e) => {
                context.refresh();
              }}
            >
              <Icon icon="fa:sync" />

              {t("opendash:widgets.reload")}
            </Menu.Item>

            <Menu.Item
              disabled={!hasSettings}
              title={t("opendash:widgets.settings_modal_tooltip")}
              onClick={(e) => {
                context.store.update((state) => {
                  state.settings = true;
                });
              }}
            >
              <Icon icon="fa:cog" />

              {t("opendash:widgets.settings")}
            </Menu.Item>
          </Menu>
        </WidgetHeaderAction>
      </WidgetHeader>

      <WidgetContent ref={context.containerRef}>{children}</WidgetContent>
    </WidgetContainer>
  );
});
