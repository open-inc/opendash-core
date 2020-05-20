import * as React from "react";
import {
  DataItemInterface,
  useOpenDashServices,
  useForceRender,
} from "../../..";

export function useDataItem(source: string, id: string): DataItemInterface {
  const { DataService } = useOpenDashServices();
  const forceRender = useForceRender();

  React.useEffect(() => {
    if (id) {
      // @ts-ignore
      return DataService.subscribeItem({ source, id }, () => {
        forceRender();
      });
    }
  }, [id]);

  if (!id) {
    return undefined;
  }

  return DataService._getOrThrowSync(source, id);
}
