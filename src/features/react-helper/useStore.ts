import * as React from "react";

import { Store, useForceRender } from "../..";

export function useStore<T, U>(store: Store<T>, selector: (state: T) => U): U {
  const forceRender = useForceRender();

  const selectorRef = React.useRef(null);
  const valueRef = React.useRef(null);

  selectorRef.current = selector;

  React.useEffect(() => {
    return store.subscribe(() => {
      const currentValue = store.select(selectorRef.current);

      if (valueRef.current !== currentValue) {
        forceRender();
      }
    });
  }, [store]);

  valueRef.current = store.select(selector);

  return valueRef.current;
}
