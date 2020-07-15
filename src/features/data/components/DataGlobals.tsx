import * as React from "react";

import { DataItemSettingsModal, useDataItemSettingsModal } from "../../..";

interface Props {}

export const DataGlobals = React.memo<Props>(function DataGlobals({
  children,
}) {
  const [itemSettings, setAddAlarm] = useDataItemSettingsModal();

  return (
    <React.Fragment>
      {children}

      <DataItemSettingsModal
        key={JSON.stringify(itemSettings)}
        item={itemSettings}
        open={!!itemSettings}
        close={() => setAddAlarm(undefined)}
      />
    </React.Fragment>
  );
});
