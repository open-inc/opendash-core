import {
  AppInterface,
  ServicesInterface,
  BaseService,
  NavigationAdapterInterface,
  NavigationAdapterContext,
  NavigationGroupInterface,
  NavigationItemInterface,
  NavigationPlaceInterface,
} from "../../..";

export class NavigationService extends BaseService {
  private app: AppInterface;
  private services: ServicesInterface;
  private adapter: NavigationAdapterInterface;
  private context: NavigationAdapterContext;

  private dynamicNavigationGroups = new Set<NavigationGroupInterface>();
  private dynamicNavigationItems = new Set<NavigationItemInterface>();

  constructor(app: AppInterface, adapter: NavigationAdapterInterface) {
    super({
      initialState: {},
    });

    this.app = app;
    this.services = app.services;
    this.adapter = adapter;
    this.context = new NavigationAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, this.services);
  }

  getGroups(place: NavigationPlaceInterface): NavigationGroupInterface[] {
    return Array.from(this.dynamicNavigationGroups.values());
  }

  getItems(place: NavigationPlaceInterface): NavigationItemInterface[] {
    return Array.from(this.dynamicNavigationItems.values());
  }

  registerDynamicNavigationGroup(group: NavigationGroupInterface): () => void {
    this.dynamicNavigationGroups.add(group);
    super.notifySubscribers();

    return () => {
      this.dynamicNavigationGroups.delete(group);
      super.notifySubscribers();
    };
  }

  registerDynamicNavigationItem(item: NavigationItemInterface): () => void {
    this.dynamicNavigationItems.add(item);
    super.notifySubscribers();

    return () => {
      this.dynamicNavigationItems.delete(item);
      super.notifySubscribers();
    };
  }
}
