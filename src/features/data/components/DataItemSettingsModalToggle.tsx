import * as React from "react";

import { Button } from "antd";
import { Icon } from "@opendash/icons";

import { DataItemInterface, useDataItemSettingsModal } from "../../..";

interface Props {
  item: DataItemInterface;
  buttonProps?: any;
}

export const DataItemSettingsModalToggle = React.memo<Props>(
  function DataItemSettingsModalToggle({ item, buttonProps = {} }) {
    const [, openModal] = useDataItemSettingsModal();

    return (
      <Button
        {...buttonProps}
        type="default"
        shape="circle"
        icon={<Icon icon="fa:pen" />}
        onClick={() => {
          openModal(item);
        }}
      />
    );
  }
);
