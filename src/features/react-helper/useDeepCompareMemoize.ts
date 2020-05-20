// from https://github.com/kentcdodds/use-deep-compare-effect

import * as React from "react";

import { equals } from "../..";

export function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!equals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
