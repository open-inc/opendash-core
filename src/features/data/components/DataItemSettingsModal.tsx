import * as React from "react";

import { Modal, Tabs, message } from "antd";

import produce from "immer";

import {
  useOpenDashServices,
  useTranslation,
  AlarmList,
  AlarmCreate,
  useAlarmsForItem,
  DataItemInterface,
} from "../../..";
import { FormGenerator } from "../../core/components/FormGenerator";

interface Props {
  item: DataItemInterface;
  open: boolean;
  close: () => void;
}

export const DataItemSettingsModal = React.memo<Props>(
  function DataItemSettingsModal({ item, open, close }) {
    const [t] = useTranslation(["opendash"]);

    const { DataService, UserStorageService } = useOpenDashServices();

    const [state, setState] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
      if (item) {
        setState(
          UserStorageService._getSync(`opendash/data/names/${item.source}`) ||
            {}
        );
      } else {
        setState({});
      }
    }, [item?.id, item?.source]);

    function submit() {
      UserStorageService.set(`opendash/data/names/${item.source}`, state).then(
        (ok) => {
          message.success(t("account.data_item_settings.save_success"));
          close();
        },
        (error) => {
          message.error(t("account.data_item_settings.save_error"));
        }
      );
    }

    return (
      <Modal
        visible={open}
        title={
          item &&
          t("account.data_item_settings.modal_title", {
            name: DataService.getItemName(item),
          })
        }
        cancelText={t("ui.close")}
        onCancel={() => close()}
        okText={t("ui.save")}
        onOk={() => {
          submit();
        }}
      >
        <p>{t("account.data_item_settings.description")}</p>
        {item && (
          <FormGenerator
            state={state}
            updateState={(key, value) => {
              setState(produce((draft) => void (draft[key] = value)));
            }}
            onSubmit={() => {
              submit();
            }}
            elements={[
              {
                key: JSON.stringify([item.id]),
                type: "input",
                label: t("account.data_item_settings.input_item_label", {
                  name: item.name,
                }),
                settings: {
                  allowClear: true,
                },
              },
              ...item.valueTypes.map((valueType, i) => ({
                key: JSON.stringify([item.id, i]),
                type: "input",
                label: t("account.data_item_settings.input_dimension_label", {
                  name: valueType.name,
                  dimension: i,
                }),
                settings: {
                  allowClear: true,
                },
              })),
            ]}
          />
        )}
      </Modal>
    );
  }
);
