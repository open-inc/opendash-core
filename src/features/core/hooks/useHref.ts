import * as React from "react";

import { useLocation } from "react-router-dom";

import { useEventListener } from "../../..";

export function useHref() {
  const location = useLocation();
  const [href, setHref] = React.useState(window.location.href);

  useEventListener("hashchange", () => {
    if (href !== window.location.href) {
      setHref(window.location.href);
    }
  });

  React.useEffect(() => {
    setHref(window.location.href);
  }, [location?.key]);

  return href;
}
