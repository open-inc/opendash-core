import * as React from "react";
import { DataItemInterface, useOpenDashServices } from "../../..";

export function useDataItems(): DataItemInterface[] {
  const { DataService, UserStorageService } = useOpenDashServices();
  const [items, setItems] = React.useState(DataService._listOrThrowSync());

  React.useEffect(() => {
    return DataService.subscribeItemList(() => {
      setItems(DataService._listOrThrowSync());
    });
  }, []);

  // TODO trigger change when user storage changes to apply name
  // overwrites. This might result in performance issues.
  React.useEffect(() => {
    return UserStorageService.subscribe(() => {
      setItems([...items]);
    });
  }, [items]);

  return items;
}
