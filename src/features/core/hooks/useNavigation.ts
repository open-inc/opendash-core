import * as React from "react";

import picomatch from "picomatch";

import { usePath, useAppState, useOpenDashApp, useTranslation } from "../../..";

import {
  NavigationItemInterface,
  NavigationPlaceInterface,
  NavigationGroupWithChildrenInterface,
} from "../../..";

export function useNavigation(
  place: NavigationPlaceInterface
): [
  NavigationGroupWithChildrenInterface[],
  NavigationItemInterface[],
  string[]
] {
  const app = useOpenDashApp();
  const path = usePath();

  const [userGroups, userItems] = useAppState((state) => [
    state.navigation.userNavigationGroups,
    state.navigation.userNavigationItems,
  ]);

  const groups = React.useMemo(
    () =>
      [...userGroups, ...app.ui.staticNavigationGroups].sort(
        (a, b) => a.order - b.order
      ),
    [userGroups]
  );

  const items = React.useMemo(
    () =>
      [...userItems, ...app.ui.staticNavigationItems]
        .filter((item) => item.place === place)
        .filter((item) =>
          item.routeCondition
            ? picomatch.isMatch(path, item.routeCondition)
            : true
        )
        .sort((a, b) => a.order - b.order),
    [userItems, path, place]
  );

  // const namespaces = useNamespaces(groups, items);

  const t = useTranslation(/*namespaces*/);

  const activeItems = React.useMemo(() => {
    return items
      .filter((item) =>
        item.activeCondition
          ? picomatch.isMatch(path, item.activeCondition)
          : false
      )
      .map((item) => item.id);
  }, [items, path]);

  const result: NavigationGroupWithChildrenInterface[] = React.useMemo(() => {
    return groups
      .map((group) => {
        return {
          ...group,
          label: t(group.label),
          children: items
            .filter((item) => item.group === group.id)
            .map((item) => {
              return { ...item, label: t(item.label) };
            }),
        };
      })
      .filter((group) => group.children.length > 0);
  }, [groups, items]);

  return [result, items, activeItems];
}

function useNamespaces(groups, items) {
  return React.useMemo(
    () =>
      ["translation"].concat(
        [...groups, ...items]
          .map(({ label }) => label)
          .filter((v, i, a) => a.indexOf(v) === i)
          .map((label) => {
            const parts = label.split(":");

            if (parts.length > 1) {
              return parts[0];
            }

            return null;
          })
          .filter(Boolean)
          .filter((v, i, a) => a.indexOf(v) === i)
      ),
    [groups, items]
  );
}
