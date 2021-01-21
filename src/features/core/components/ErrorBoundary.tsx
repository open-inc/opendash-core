import * as React from "react";

import { ErrorBoundaryPropsInterface, equals } from "../../..";
import { ErrorLayout } from "./ErrorBoundary.layout";

export class ErrorBoundary extends React.Component<ErrorBoundaryPropsInterface> {
  state: { error: Error } = { error: undefined };

  resetState = (goHome = false) => {
    if (goHome) {
      return void (window.location.href = "/");
    }

    this.setState({ error: null });

    if (this.props.onErrorReset) {
      this.props.onErrorReset();
    }

    // TODO implement goHome
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.error &&
      this.props.dependencies &&
      prevProps.dependencies &&
      !equals(prevProps.dependencies, this.props.dependencies)
    ) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error, info) {
    // console.error("ErrorBoundary error", error);
    // console.error("ErrorBoundary info", info);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <ErrorLayout reset={this.resetState}>
          <h1>Error</h1>
          {this.state.error?.message && <h2>{this.state.error.message}</h2>}
          <pre>{this.state.error.stack}</pre>
        </ErrorLayout>
      );
    }

    return this.props.children;
  }
}
