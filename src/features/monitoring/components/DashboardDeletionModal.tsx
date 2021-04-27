import * as React from "react";

import { Modal } from "antd";
import {
  useOpenDashServices,
  useTranslation,
  useDashboard,
  createInternalComponent,
} from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const DashboardDeletionModal = createInternalComponent<Props>(
  function DashboardDeletionModal({ id, open, close }) {
    const t = useTranslation();
    const { MonitoringService } = useOpenDashServices();
    const dashboard = useDashboard(id);

    if (!dashboard) {
      // console.warn(`DashboardSettingsModal: dashboard "${id}" not found.`);
      return null;
    }

    return (
      <Modal
        visible={open}
        title={t("opendash:dashboards.delete_modal_title")}
        okText={t("opendash:ui.delete")}
        onOk={() => {
          close();
          MonitoringService.deleteDashboard(dashboard);
        }}
        cancelText={t("opendash:ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ danger: true }}
      >
        {t("opendash:dashboards.delete_modal_description")}
      </Modal>
    );
  }
);
