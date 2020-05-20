import {
  NavigationGroupInterface,
  NavigationItemInterface,
  NavigationService,
  AppInterface,
} from "../../..";

export class NavigationAdapterContext {
  private service: NavigationService;
  private app: AppInterface;

  constructor(service: NavigationService, app: AppInterface) {
    this.service = service;
    this.app = app;
  }

  setLoading(value: boolean): void {
    this.service.setLoading(value);
  }

  setNavigationGroups(items: Array<NavigationGroupInterface>) {
    this.app.state.update((draft) => {
      draft.navigation.userNavigationGroups = items;
      draft.navigation.userNavigationGroups.sort((a, b) => a.order - b.order);
    });
  }

  updateNavigationGroup(id: string, item: NavigationGroupInterface) {
    this.app.state.update((draft) => {
      const item = draft.navigation.userNavigationGroups.find(
        (i) => i.id === id
      );

      // create
      if (!item && item) {
        draft.navigation.userNavigationGroups.push(item);
      }

      // delete
      if (item && !item) {
        draft.navigation.userNavigationGroups = draft.navigation.userNavigationGroups.filter(
          (i) => i !== item
        );
      }

      // update
      if (item) {
        Object.assign(item, item);
      }

      draft.navigation.userNavigationGroups.sort((a, b) => a.order - b.order);
    });
  }

  setNavigationItems(items: Array<NavigationItemInterface>) {
    this.app.state.update((draft) => {
      draft.navigation.userNavigationItems = items;
      draft.navigation.userNavigationItems.sort((a, b) => a.order - b.order);
    });
  }

  updateNavigationItem(id: string, item: NavigationItemInterface) {
    this.app.state.update((draft) => {
      const item = draft.navigation.userNavigationItems.find(
        (i) => i.id === id
      );

      // create
      if (!item && item) {
        draft.navigation.userNavigationItems.push(item);
      }

      // delete
      if (item && !item) {
        draft.navigation.userNavigationItems = draft.navigation.userNavigationItems.filter(
          (i) => i !== item
        );
      }

      // update
      if (item) {
        Object.assign(item, item);
      }

      draft.navigation.userNavigationItems.sort((a, b) => a.order - b.order);
    });
  }
}
