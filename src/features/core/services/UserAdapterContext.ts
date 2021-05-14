import { UserInterface, UserService, AppInterface } from "../../..";

export class UserAdapterContext {
  private service: UserService;
  private app: AppInterface;

  constructor(service: UserService, app: AppInterface) {
    this.service = service;
    this.app = app;
  }

  setLoading(value: boolean): void {
    this.service.setLoading(value);
  }

  setValidated(value: boolean) {
    this.service.store.update((draft) => {
      draft.validated = value;
    });
  }

  setOffline(value: boolean) {
    this.service.store.update((draft) => {
      draft.offline = value;
    });
  }

  setCurrentUser(user: UserInterface) {
    this.service.store.update((draft) => {
      draft.currentUser = user;
    });
  }

  setConfig(config: Record<string, string>) {
    this.service.store.update((draft) => {
      draft.config = config;
    });
  }

  setPermissions(permissions: string[]) {
    this.service.store.update((draft) => {
      draft.permissions = permissions;
    });
  }
}
