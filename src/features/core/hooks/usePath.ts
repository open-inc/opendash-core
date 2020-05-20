import * as React from "react";

import { useHref } from "../../..";

export function usePath() {
  const href = useHref();

  const [path, setPath] = React.useState(hrefToPath(href));

  React.useEffect(() => {
    const nextPath = hrefToPath(href);

    if (path !== nextPath) {
      setPath(nextPath);
    }
  }, [href]);

  return path;
}

function hrefToPath(href) {
  return new URL(href).pathname;
}
