import * as React from "react";

import {
  useTranslation,
  useWidgetPresets,
  useOpenDashServices,
  WidgetTypePresetsInterface,
  createInternalComponent,
} from "../../..";

import { Modal, List, Checkbox } from "antd";

interface Props {
  open: boolean;
  close: () => void;
  limit?: number;
  onSave?: (presets: WidgetTypePresetsInterface[]) => void;
}

export const WidgetCreationModal = createInternalComponent<Props>(
  function WidgetCreationModal({ open, close, limit = 1, onSave }) {
    const t = useTranslation();
    const presets = useWidgetPresets();
    const [selection, setSelection] = React.useState([]);

    React.useEffect(() => {
      if (!open) {
        setSelection([]);
      }
    }, [open]);

    return (
      <Modal
        title={t("opendash:widgets.catalogue.title")}
        okText={t("opendash:widgets.catalogue.ok_button")}
        visible={open}
        onCancel={(e) => close()}
        onOk={() => {
          const selectedPresets: WidgetTypePresetsInterface[] = selection.map(
            (i) => presets[i]
          );

          onSave(selectedPresets);
          close();
        }}
        okButtonProps={{
          disabled: selection.length === 0,
        }}
      >
        <p>{t("opendash:widgets.catalogue.description")}</p>
        <List
          dataSource={presets}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Checkbox
                  key="checkbox"
                  checked={selection.includes(index)}
                  onChange={(e) =>
                    setSelection((cur) => {
                      if (e.target.checked) {
                        return [...cur, index];
                      } else {
                        return cur.filter((v) => v !== index);
                      }
                    })
                  }
                />,
              ]}
            >
              <List.Item.Meta
                // avatar={<img src={item.imageLink} />}
                title={item.label}
                description={item.description}
              />
            </List.Item>
          )}
        ></List>
      </Modal>
    );
  }
);
