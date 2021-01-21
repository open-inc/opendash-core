import * as React from "react";

import { useEventListener } from "../..";

export function useLocalStorage<T = any>(
  key: string,
  initialValue?: T
): [T, (next: T) => void] {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEventListener("storage", ({ key: k, newValue }) => {
    if (k === key && JSON.stringify(storedValue) !== newValue) {
      setStoredValue(JSON.parse(newValue));
    }
  });

  const setValue = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;

    setStoredValue(newValue);

    window.localStorage.setItem(key, JSON.stringify(newValue));

    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: JSON.stringify(newValue),
      })
    );
  };

  return [storedValue, setValue];
}
