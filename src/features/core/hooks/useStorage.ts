import produce, { Draft } from "immer";
import * as React from "react";
import {
  useForceRender,
  useStorageService,
  StorageOptionsInterface,
} from "../../..";

type Result<S> = [
  S,
  (replacement: S) => void
  // (f: (draft: Draft<S>) => void | S) => void,
  // (objectToAssign: S) => void
];

export function useStorage<S = any>(
  scope: "user" | "device",
  key: string,
  defaultValue?: S,
  options?: StorageOptionsInterface<S>
): Result<S> {
  const ref = React.useRef(null);
  const service = useStorageService(scope);
  const forceRender = useForceRender();
  const state = service._getSync(key, options) || defaultValue;

  ref.current = state;

  React.useEffect(() => {
    return service.subscribe(() => {
      if (service._getSync(key, options) !== ref.current) {
        forceRender();
      }
    });
  }, [scope, key, ref]);

  return [
    state,
    // the normal useState + object freeze way "replaceDraft"
    React.useCallback(
      (value) => {
        service.set(key, value, options);
      },
      [scope, key]
    ),
    // // the immer way "updateDraft"
    // React.useCallback(
    //   updater => {
    //     service.set(key, produce(state, updater));
    //   },
    //   [scope, key]
    // ),
    // // the object assign way "assignDraft"
    // React.useCallback(
    //   update => {
    //     service.set(
    //       key,
    //       produce(state, draft => void Object.assign(draft, update))
    //     );
    //   },
    //   [scope, key]
    // ),
  ];
}
