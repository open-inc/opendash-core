import * as React from "react";

import { Modal, Input } from "antd";
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

export const WidgetRenamingModal = createInternalComponent<Props>(
  function WidgetRenamingModal({ id, open, close }) {
    const t = useTranslation();
    const { MonitoringService } = useOpenDashServices();

    const widget = useWidget(id);

    const [draft, setDraft] = React.useState(undefined);

    React.useEffect(() => {
      if (open && widget?.name) {
        setDraft(widget.name);
      }
    }, [widget?.name, open]);

    if (!widget) {
      console.warn(`WidgetSettingsModal: widget "${id}" not found.`);
      return null;
    }

    return (
      <Modal
        visible={open}
        title={t("opendash:widgets.rename_modal_title")}
        okText={t("opendash:ui.rename")}
        onOk={() => {
          MonitoringService.updateWidget({ ...widget, id, name: draft }).then(
            () => {
              close();
            }
          );
        }}
        cancelText={t("opendash:ui.cancel")}
        onCancel={(e) => close()}
        okButtonProps={{ disabled: widget.name === draft }}
      >
        <p>{t("opendash:widgets.rename_modal_description")}</p>

        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("opendash:widgets.rename_modal_placeholder")}
        />
      </Modal>
    );
  }
);
