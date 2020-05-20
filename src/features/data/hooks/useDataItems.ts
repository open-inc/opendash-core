import * as React from "react";
import {
  DataItemInterface,
  useOpenDashServices,
  useForceRender,
} from "../../..";

export function useDataItems(): DataItemInterface[] {
  const { DataService } = useOpenDashServices();
  const [items, setItems] = React.useState(DataService._listOrThrowSync());

  React.useEffect(() => {
    return DataService.subscribeItemList(() => {
      setItems(DataService._listOrThrowSync());
    });
  }, []);

  return items;
}
