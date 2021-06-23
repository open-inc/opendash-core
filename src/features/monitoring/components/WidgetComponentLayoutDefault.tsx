import * as React from "react";

import { Dropdown, Menu, message } from "antd";

import { Icon } from "@opendash/icons";

import {
  WidgetContainer,
  WidgetHeader,
  WidgetHeaderName,
  WidgetContent,
  WidgetHeaderAction,
} from "./WidgetComponentLayoutDefault.layout";

import {
  createInternalComponent,
  useServiceStore,
  useTranslation,
  WidgetContext,
} from "../../..";
import { useNavigate } from "react-router";

export const WidgetComponentLayoutDefault = createInternalComponent<
  React.PropsWithChildren<{ context: WidgetContext }>
>(function WidgetComponentLayoutDefault({ children, context }) {
  const t = useTranslation();
  const navigate = useNavigate();

  const name = useServiceStore(context, (state) => state.name);

  const hasSettings =
    context.type?.settingsComponent ||
    context.type?.dataItems ||
    context.type?.dataFetching;

  return (
    <WidgetContainer>
      <WidgetHeader>
        <Dropdown
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item
                key="rename"
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
                key="delete"
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
                key="share"
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
                key="full"
                title={t("opendash:widgets.fullscreen_tooltip")}
                onClick={(e) => {
                  navigate("/monitoring/widgets/" + context.id);
                }}
              >
                <Icon icon="fa:expand-arrows" />

                {t("opendash:widgets.fullscreen_action")}
              </Menu.Item>

              <Menu.Item
                disabled={!hasSettings}
                key="reload"
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
                key="settings"
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
          }
        >
          <WidgetHeaderAction>
            <Icon icon="fa:ellipsis-v" />
          </WidgetHeaderAction>
        </Dropdown>

        <WidgetHeaderName title={context.widget.name || name}>
          {context.widget.name || name}
        </WidgetHeaderName>
      </WidgetHeader>

      <WidgetContent ref={context.containerRef}>{children}</WidgetContent>
    </WidgetContainer>
  );
});
