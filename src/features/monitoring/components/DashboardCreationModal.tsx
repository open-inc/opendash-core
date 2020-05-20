import * as React from "react";

import { Modal, Input } from "antd";
import { useOpenDashServices, useTranslation, useDashboard } from "../../..";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (id: string) => void;
}

export const DashboardCreationModal = React.memo<Props>(
  ({ open, close, onSave }) => {
    const [t] = useTranslation(["opendash"]);
    const { DashboardService } = useOpenDashServices();

    const [name, setName] = React.useState(undefined);

    React.useEffect(() => {
      setName(undefined);
    }, [open]);

    return (
      <Modal
        visible={open}
        title={t("dashboards.create_modal_title")}
        okText={t("ui.create")}
        onOk={() => {
          // @ts-ignore
          DashboardService.createDashboard({ name: name }).then((id) => {
            if (onSave) {
              onSave(id);
            }
          });

          close();
        }}
        cancelText={t("ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ disabled: !name }}
      >
        <p>{t("dashboards.create_modal_description")}</p>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("dashboards.create_modal_placeholder")}
        ></Input>
      </Modal>
    );
  }
);
