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
    this.app.state.update((draft) => {
      draft.user.validated = value;
    });
  }

  setOffline(value: boolean) {
    this.app.state.update((draft) => {
      draft.user.offline = value;
    });
  }

  setCurrentUser(user: UserInterface) {
    this.app.state.update((draft) => {
      draft.user.current = user;
    });
  }
}
