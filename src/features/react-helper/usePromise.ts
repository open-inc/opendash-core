import { useEffect, useState } from "react";

function resolvePromise<T>(
  promise: Promise<T> | (() => Promise<T>)
): Promise<T> {
  if (typeof promise === "function") {
    return promise();
  }

  return promise;
}

export function usePromise<T>(
  promise: Promise<T> | (() => Promise<T>),
  inputs: any[]
): [T, Error, boolean] {
  const [{ error, result, pending }, setState] = useState({
    error: undefined,
    result: undefined,
    pending: true,
  });

  useEffect(() => {
    promise = resolvePromise(promise);

    if (!promise) {
      return;
    }

    let canceled = false;

    setState({
      error: undefined,
      result: undefined,
      pending: true,
    });

    promise.then(
      (result) =>
        !canceled &&
        setState({
          error: undefined,
          result: result,
          pending: false,
        }),
      (error) =>
        !canceled &&
        setState({
          error: error,
          result: undefined,
          pending: false,
        })
    );

    return () => {
      canceled = true;
    };
  }, inputs);

  return [result, error, pending];
}
