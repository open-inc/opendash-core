import * as React from "react";

import { Modal } from "antd";

import {
  useTranslation,
  useWidgetBaseContextSetup,
  useWidgetContextSetup,
  Boundary,
  WidgetSettingsRender,
} from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const WidgetSettingsModal = React.memo<Props>(({ id, open, close }) => {
  const t = useTranslation();

  const baseContext = useWidgetBaseContextSetup(id);
  const context = useWidgetContextSetup(baseContext);

  if (!baseContext.widget) {
    console.warn(`WidgetSettingsModal: widget "${id}" not found.`);
    return null;
  }

  if (!baseContext.type) {
    console.warn(
      `WidgetComponent: type "${baseContext.widget.type}" not found.`
    );
    return null;
  }

  return (
    <Modal
      visible={open}
      title={t("opendash:widgets.settings_modal_title")}
      okText={t("opendash:ui.save")}
      onOk={() => {
        context.saveDraft();
        close();
      }}
      cancelText={t("opendash:ui.cancel")}
      onCancel={(e) => close()}
      width={Math.min(800, window.innerWidth)}
    >
      <Boundary>
        <WidgetSettingsRender context={context} baseContext={baseContext} />
      </Boundary>
    </Modal>
  );
});
