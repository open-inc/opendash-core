import * as React from "react";

import { Modal } from "antd";
import { useOpenDashServices, useTranslation, useDashboard } from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const DashboardDeletionModal = React.memo<Props>(
  ({ id, open, close }) => {
    const [t] = useTranslation(["opendash"]);
    const { DashboardService } = useOpenDashServices();
    const dashboard = useDashboard(id);

    if (!dashboard) {
      // console.warn(`DashboardSettingsModal: dashboard "${id}" not found.`);
      return null;
    }

    return (
      <Modal
        visible={open}
        title={t("dashboards.delete_modal_title")}
        okText={t("ui.delete")}
        onOk={() => {
          close();
          DashboardService.deleteDashboard(dashboard);
        }}
        cancelText={t("ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ danger: true }}
      >
        {t("dashboards.delete_modal_description")}
      </Modal>
    );
  }
);
