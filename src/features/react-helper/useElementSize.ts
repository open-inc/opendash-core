import { useState, useCallback, useLayoutEffect } from "react";
import throttle from "lodash.throttle";

interface ComponentSize {
  width: number;
  height: number;
}

function getSize(ref): ComponentSize {
  if (!ref || !ref.current) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight,
  };
}

export function useElementSize<T = any>(
  ref: React.RefObject<T>,
  throttleDuration: number = 0
): ComponentSize {
  const [state, setState] = useState(getSize(ref));

  function _handleResize() {
    const nextState = getSize(ref);
    const shouldUpdate =
      nextState.width !== state.width || nextState.height !== state.height;

    if (shouldUpdate) {
      setState(nextState);
    }
  }

  const handleResize = useCallback(
    throttleDuration
      ? throttle(_handleResize, throttleDuration)
      : _handleResize,
    [ref, throttleDuration]
  );

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    handleResize();

    // @ts-ignore // TS doesn't know about ResizeObserver yet
    if (typeof ResizeObserver === "function") {
      // @ts-ignore // TS doesn't know about ResizeObserver yet
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      // @ts-ignore // TS doesn't know about ResizeObserver yet
      resizeObserver.observe(ref.current);

      return () => {
        // @ts-ignore // TS doesn't know about ResizeObserver yet
        resizeObserver.disconnect(ref.current);
      };
    } else {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [ref.current]);

  return state;
}
