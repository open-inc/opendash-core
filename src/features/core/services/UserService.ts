import {
  AppInterface,
  UserInterface,
  BaseService,
  UserAdapterInterface,
  UserAdapterContext,
  AuthPayloadInterface,
} from "../../..";

export class UserService extends BaseService {
  private app: AppInterface;
  private adapter: UserAdapterInterface;
  private context: UserAdapterContext;

  constructor(app: AppInterface, adapter: UserAdapterInterface) {
    super({
      initialState: {},
    });

    this.app = app;
    this.adapter = adapter;
    this.context = new UserAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  currentUser(): UserInterface {
    return this.app.state.select((state) => state.user.current);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  async login(payload: AuthPayloadInterface): Promise<void> {
    return await this.adapter.login(payload);
  }

  async register(payload: AuthPayloadInterface): Promise<void> {
    return await this.adapter.register(payload);
  }

  async logout(): Promise<void> {
    return await this.adapter.logout();
  }
}
