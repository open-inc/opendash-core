import produce, { Draft } from "immer";
import { useState, useCallback } from "react";

type Result<S> = [
  S,
  (f: (draft: Draft<S>) => void | S) => void,
  (replacement: S) => void,
  (objectToAssign: Partial<S>) => void
];

export function useImmerState<S = any>(initialValue: S | (() => S)): Result<S> {
  const [state, setState] = useState<S>(initialValue);

  return [
    state,
    // the immer way "updateDraft"
    useCallback((updater) => {
      setState((state) => produce(state, updater) as S);
    }, []),
    // the normal useState + object freeze way "replaceDraft"
    useCallback((update) => {
      setState((state) => produce(state, (draft) => update) as S);
    }, []),
    // the object assign way "assignDraft"
    useCallback((update) => {
      setState(
        (state) =>
          produce(state, (draft) => void Object.assign(draft, update)) as S
      );
    }, []),
  ];
}
