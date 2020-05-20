// from https://github.com/kentcdodds/use-deep-compare-effect

import * as React from "react";

import { useDeepCompareMemoize } from "../..";

export function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
) {
  return React.useCallback(callback, useDeepCompareMemoize(dependencies));
}
