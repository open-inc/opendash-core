import { useRef, useEffect } from "react";

export function useInterval(callback: () => void, timeout: number) {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function intervalCallback() {
      if (callbackRef.current) {
        callbackRef.current();
      }
    }

    if (timeout) {
      const id = setInterval(intervalCallback, timeout);
      return () => clearInterval(id);
    }
  }, [timeout]);
}
