import * as React from "react";

import { Modal, Input } from "antd";
import {
  useOpenDashServices,
  useTranslation,
  useDashboard,
  createInternalComponent,
} from "../../..";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (id: string) => void;
}

export const DashboardCreationModal = createInternalComponent<Props>(
  function DashboardCreationModal({ open, close, onSave }) {
    const t = useTranslation();
    const { MonitoringService } = useOpenDashServices();

    const [name, setName] = React.useState(undefined);

    React.useEffect(() => {
      setName(undefined);
    }, [open]);

    return (
      <Modal
        visible={open}
        title={t("opendash:dashboards.create_modal_title")}
        okText={t("opendash:ui.create")}
        onOk={() => {
          // @ts-ignore
          MonitoringService.createDashboard({ name: name }).then((id) => {
            if (onSave) {
              onSave(id);
            }
          });

          close();
        }}
        cancelText={t("opendash:ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ disabled: !name }}
      >
        <p>{t("opendash:dashboards.create_modal_description")}</p>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("opendash:dashboards.create_modal_placeholder")}
        ></Input>
      </Modal>
    );
  }
);
