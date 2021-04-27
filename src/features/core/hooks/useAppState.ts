import * as React from "react";

import { useStore, useOpenDashApp, AppStateInterface } from "../../..";

export function useAppState<X>(selector: (a: AppStateInterface) => X): X {
  const app = useOpenDashApp();
  // const forceRender = useForceRender();

  // const selectorRef = React.useRef(null);
  // const valueRef = React.useRef(null);

  // selectorRef.current = selector;

  // React.useEffect(() => {
  //   return app.state.subscribe(() => {
  //     const currentValue = app.state.select(selectorRef.current);

  //     if (valueRef.current !== currentValue) {
  //       forceRender();
  //     }
  //   });
  // }, []);

  // valueRef.current = app.state.select(selector);

  // return valueRef.current;

  return useStore(app.state, selector);
}
