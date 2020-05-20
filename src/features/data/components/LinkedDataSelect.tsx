import * as React from "react";

import { Button, Popover } from "antd";

import {
  useTranslation,
  LinkedDataItemPicker,
  LinkedDataItemHistoryOptionsPicker,
} from "../../..";

interface Props {
  style: React.CSSProperties;
}

const selectStyle = {
  width: "100%",
  marginBottom: 10,
};

export const LinkedDataSelect: React.FC<Props> = ({ style }) => {
  const [t] = useTranslation(["opendash"]);

  const content = React.useMemo(
    () => (
      <>
        <LinkedDataItemPicker style={selectStyle} />
        <LinkedDataItemHistoryOptionsPicker style={selectStyle} />
      </>
    ),
    []
  );

  return (
    <Popover
      placement="bottomRight"
      content={content}
      title={t("ui.select_linked_data")}
      trigger="click"
    >
      <Button style={style}>{t("ui.select_linked_data")}</Button>
    </Popover>
  );
};
