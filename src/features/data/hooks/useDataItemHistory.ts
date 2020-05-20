import { useState, useEffect, useRef } from "react";

import {
  useOpenDashServices,
  DataItemInterface,
  DataFetchingOptionsInterface,
  DataItemValueInterface,
} from "../../..";

export function useDataItemHistory(
  item: DataItemInterface,
  options: DataFetchingOptionsInterface
): DataItemValueInterface[] {
  const { DataService } = useOpenDashServices();

  const loadingRef = useRef(false);
  const bufferRef = useRef([]);
  const [result, setResult] = useState<DataItemValueInterface[]>([]);

  useEffect(() => {
    if (item && options?.live) {
      return DataService.subscribeValue(item, () => {
        const value = DataService._getValueOrThrowSync(item);

        if (loadingRef.current) {
          bufferRef.current.push(value);
        } else {
          setResult((current) => [...current, value]);
        }
      });
    }
  }, [item?.id, item?.source, options?.live]);

  useEffect(() => {
    if (item) {
      loadingRef.current = true;

      DataService.fetchValues(item, options).then(
        (result) => {
          loadingRef.current = false;
          setResult([...result, ...bufferRef.current]);
        },
        (error) => {
          loadingRef.current = false;
          console.error(error);
          setResult([]);
        }
      );
    } else {
      setResult([]);
    }
  }, [item?.id, item?.source, options?.start, options?.end]);

  return result;
}
