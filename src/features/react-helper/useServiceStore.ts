import * as React from "react";

import { BaseService, useStore } from "../..";

export function useServiceStore<T, U>(
  service: BaseService<T>,
  selector: (state: T) => U
): U {
  return useStore(service.store, selector);
}
