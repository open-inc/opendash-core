import {
  AppInterface,
  UserInterface,
  BaseService,
  UserAdapterInterface,
  UserAdapterContext,
  AuthPayloadInterface,
  RoleInterface,
  urlBase64ToUint8Array,
} from "../../..";

interface StateInterface {
  currentUser: UserInterface | null;
  offline: boolean;
  validated: boolean;
  config: Record<string, string>;
  permissions: string[];

  users: UserInterface[];
  roles: RoleInterface[];
}

export class UserService extends BaseService<StateInterface> {
  private app: AppInterface;
  private adapter: UserAdapterInterface;
  private context: UserAdapterContext;

  constructor(app: AppInterface, adapter: UserAdapterInterface) {
    super({
      initialState: {
        currentUser: null,
        offline: false,
        validated: false,
        config: {},
        permissions: [],

        users: [],
        roles: [],
      },
    });

    this.app = app;
    this.adapter = adapter;
    this.context = new UserAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  currentUser(): UserInterface {
    return this.store.select((state) => state.currentUser);
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

  getConfig(key: string): string {
    return this.store.select((state) => state.config[key]) || "";
  }

  getConfigBoolean(key: string): boolean {
    const config = this.getConfig(key);

    if (!config || config.toLowerCase() === "true" || config === "0") {
      return false;
    }

    return true;
  }

  hasPermission(key: string): boolean {
    return this.store.select((state) => state.permissions.includes(key));
  }

  async registerWebPush() {
    if (!this.adapter.handleWebPushSubscription) {
      throw new Error("Not supported by UserAdapter");
    }

    const notificationPermission = await Notification.requestPermission();

    if (notificationPermission !== "granted") {
      throw new Error("Permission not granted");
    }

    const previousIdentifier = await this.app.services.DeviceStorageService.get<string>(
      "WebPushIdentifier"
    );

    const registration = await navigator.serviceWorker.ready;

    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) {
      const nextIdentifier = await this.adapter.handleWebPushSubscription(
        previousIdentifier,
        existingSubscription.toJSON()
      );

      await this.app.services.DeviceStorageService.set<string>(
        "WebPushIdentifier",
        nextIdentifier
      );
    } else {
      if (existingSubscription) {
        await existingSubscription.unsubscribe();
      }
      const vapidPublicKey = this.getConfig("WEB_PUSH_VAPID_PUBLIC_KEY");
      console.log("vapidPublicKey", vapidPublicKey);
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey as string);

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      const nextIdentifier = await this.adapter.handleWebPushSubscription(
        previousIdentifier,
        newSubscription.toJSON()
      );

      await this.app.services.DeviceStorageService.set<string>(
        "WebPushIdentifier",
        nextIdentifier
      );
    }
  }
}
