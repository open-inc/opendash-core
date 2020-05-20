// from https://github.com/kentcdodds/use-deep-compare-effect

import * as React from "react";

import { useDeepCompareMemoize } from "../..";

export function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList
): void {
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}
