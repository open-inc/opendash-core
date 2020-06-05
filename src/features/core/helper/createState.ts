import { AppStateInterface, Store } from "../../..";

export function createState(): Store<AppStateInterface> {
  const cacheKey = "opendash/state/cache";
  const cache = loadCache(cacheKey);

  const store = new Store<AppStateInterface>(
    cache || {
      user: {
        current: undefined,
        validated: false,
        offline: false,
      },
      collaboration: {
        users: [],
        roles: [],
      },
      sources: {
        current: undefined,
        all: [],
      },
      dashboards: {
        dashboards: [],
        widgets: [],
        alarms: [],
        alarmWebhooks: [],

        currentDashboard: undefined,
        linkedItem: undefined,
        linkedHistory: {},
      },
      navigation: {
        userNavigationGroups: [],
        userNavigationItems: [],
      },
    }
  );

  store.subscribe(() => {
    saveCache(cacheKey, store.state());
  });

  return store;
}

function loadCache(cacheKey: string): AppStateInterface | null {
  try {
    return JSON.parse(window.localStorage.getItem(cacheKey));
  } catch (error) {
    return null;
  }
}

function saveCache(cacheKey: string, state: AppStateInterface) {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(state));
  } catch (error) {
    console.error(`Error writing ${cacheKey}`, error);
  }
}
