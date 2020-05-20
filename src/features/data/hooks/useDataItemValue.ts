import * as React from "react";
import {
  DataItemInterface,
  useOpenDashServices,
  DataItemValueInterface,
  useForceRender,
} from "../../..";

export function useDataItemValue(
  item: DataItemInterface
): DataItemValueInterface {
  const { DataService } = useOpenDashServices();
  const forceRender = useForceRender();

  React.useEffect(() => {
    if (item) {
      return DataService.subscribeValue(item, () => {
        forceRender();
      });
    }
  }, [item]);

  if (!item) {
    return undefined;
  }

  return DataService._getValueOrThrowSync(item);
}
