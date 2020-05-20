import * as React from "react";

import { ErrorBoundary, ErrorBoundaryPropsInterface, Suspense } from "../../..";

export const Boundary = React.memo<ErrorBoundaryPropsInterface>(
  ({ children, ...props }) => {
    return (
      <ErrorBoundary {...props}>
        <Suspense>{children}</Suspense>
      </ErrorBoundary>
    );
  }
);
