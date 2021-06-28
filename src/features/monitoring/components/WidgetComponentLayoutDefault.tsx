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
                icon={<Icon icon="fa:pen" />}
                children={t("opendash:ui.rename")}
                onClick={(e) => {
                  context.store.update((state) => {
                    state.rename = true;
                  });
                }}
              />

              <Menu.Item
                key="delete"
                title={t("opendash:widgets.delete_modal_tooltip")}
                icon={<Icon icon="fa:trash" />}
                children={t("opendash:ui.delete")}
                onClick={(e) => {
                  context.store.update((state) => {
                    state.delete = true;
                  });
                }}
              />

              <Menu.Item
                key="share"
                title={t("opendash:widgets.share_modal_tooltip")}
                icon={<Icon icon="fa:share-alt" />}
                children={t("opendash:ui.share")}
                onClick={(e) => {
                  context.store.update((state) => {
                    state.share = true;
                  });
                }}
              />

              <Menu.Item
                key="full"
                title={t("opendash:widgets.fullscreen_tooltip")}
                icon={<Icon icon="fa:expand-arrows" />}
                children={t("opendash:widgets.fullscreen_action")}
                onClick={(e) => {
                  navigate("/monitoring/widgets/" + context.id);
                }}
              />

              <Menu.Item
                key="reload"
                title={t("opendash:widgets.reload_tooltip")}
                icon={<Icon icon="fa:sync" />}
                children={t("opendash:widgets.reload")}
                onClick={(e) => {
                  context.refresh();
                }}
              />

              <Menu.Item
                disabled={!hasSettings}
                key="settings"
                title={t("opendash:widgets.settings_modal_tooltip")}
                icon={<Icon icon="fa:cog" />}
                children={t("opendash:widgets.settings")}
                onClick={(e) => {
                  context.store.update((state) => {
                    state.settings = true;
                  });
                }}
              />
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
