import * as React from "react";

import { Button } from "antd";
import { Icon } from "@opendash/icons";

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
      icon={<Icon icon="fa:bell" />}
      onClick={() => {
        openModal(item, dimension);
      }}
    />
  );
});
