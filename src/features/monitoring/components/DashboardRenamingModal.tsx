import * as React from "react";

import { Modal, Input } from "antd";
import { useOpenDashServices, useTranslation, useDashboard } from "../../..";

interface Props {
  id: string;
  open: boolean;
  close: () => void;
}

export const DashboardRenamingModal = React.memo<Props>(
  ({ id, open, close }) => {
    const [t] = useTranslation(["opendash"]);
    const { DashboardService } = useOpenDashServices();
    const dashboard = useDashboard(id);

    const [draft, setDraft] = React.useState(undefined);

    React.useEffect(() => {
      if (open && dashboard && dashboard.name) {
        setDraft(dashboard.name);
      }
    }, [dashboard, open]);

    if (!dashboard) {
      // console.warn(`DashboardSettingsModal: dashboard "${id}" not found.`);
      return null;
    }

    return (
      <Modal
        visible={open}
        title={t("dashboards.rename_modal_title")}
        okText={t("ui.rename")}
        onOk={() => {
          DashboardService.updateDashboard({ ...dashboard, id, name: draft });
          close();
        }}
        cancelText={t("ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ disabled: dashboard.name === draft }}
      >
        <p>{t("dashboards.rename_modal_description")}</p>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("dashboards.rename_modal_placeholder")}
        ></Input>
      </Modal>
    );
  }
);
