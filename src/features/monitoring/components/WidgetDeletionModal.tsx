import * as React from "react";

import { Modal } from "antd";
import {
  createInternalComponent,
  useOpenDashServices,
  useTranslation,
  useWidget,
} from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const WidgetDeletionModal = createInternalComponent<Props>(
  function WidgetDeletionModal({ id, open, close }) {
    const t = useTranslation();
    const { MonitoringService } = useOpenDashServices();

    const widget = useWidget(id);

    if (!widget) {
      console.warn(`WidgetSettingsModal: widget "${id}" not found.`);
      return null;
    }

    return (
      <Modal
        visible={open}
        title={t("opendash:widgets.delete_modal_title")}
        okText={t("opendash:ui.delete")}
        onOk={() => {
          close();
          MonitoringService.deleteWidget(widget);
        }}
        cancelText={t("opendash:ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ danger: true }}
      >
        {t("opendash:widgets.delete_modal_description")}
      </Modal>
    );
  }
);
