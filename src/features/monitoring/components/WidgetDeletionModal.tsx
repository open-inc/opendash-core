import * as React from "react";

import { Modal } from "antd";
import { useOpenDashServices, useTranslation, useWidget } from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const WidgetDeletionModal = React.memo<Props>(({ id, open, close }) => {
  const [t] = useTranslation(["opendash"]);
  const { DashboardService } = useOpenDashServices();
  const widget = useWidget(id);

  if (!widget) {
    console.warn(`WidgetSettingsModal: widget "${id}" not found.`);
    return null;
  }

  return (
    <Modal
      visible={open}
      title={t("widgets.delete_modal_title")}
      okText={t("ui.delete")}
      onOk={() => {
        close();
        DashboardService.deleteWidget(widget);
      }}
      cancelText={t("ui.cancel")}
      onCancel={(e) => close()}
      okButtonProps={{ danger: true }}
    >
      {t("widgets.delete_modal_description")}
    </Modal>
  );
});
