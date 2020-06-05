import * as React from "react";

import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { DataItemInterface, useAlarmsForItem, useAlarmModal } from "../../..";

interface Props {
  item: DataItemInterface;
  dimension: number;
  buttonProps?: any;
}

export const AlarmModalToggle = React.memo<Props>(function AlarmModalToggle({
  item,
  dimension,
  buttonProps = {},
}) {
  const alarms = useAlarmsForItem(item, dimension);
  const [, openModal] = useAlarmModal();

  return (
    <Button
      {...buttonProps}
      type={alarms.length > 0 ? "primary" : "default"}
      shape="circle"
      icon={<BellOutlined />}
      onClick={() => {
        openModal(item, dimension);
      }}
    />
  );
});
