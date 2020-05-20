import * as React from "react";

export function useForceRender() {
  const [, setState] = React.useState(0);

  return React.useCallback(() => {
    setState((current) => current + 1);
  }, []);
}
