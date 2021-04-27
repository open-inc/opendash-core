import * as React from "react";
import { observer } from "mobx-react-lite";

export function createInternalComponent<P extends object>(
  component: React.FunctionComponent<P>
): React.FunctionComponent<P> {
  return component;
}
