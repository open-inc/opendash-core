import { PropsWithChildren } from "react";

export type ErrorBoundaryPropsInterface = PropsWithChildren<{
  dependencies?: any;
  onErrorReset?: () => void;
}>;
