// from https://github.com/kentcdodds/use-deep-compare-effect

import * as React from "react";

import { useDeepCompareMemoize } from "../..";

export function useDeepCompareMemo<T>(
  factory: () => T,
  dependencies: React.DependencyList
) {
  return React.useMemo(factory, useDeepCompareMemoize(dependencies));
}
