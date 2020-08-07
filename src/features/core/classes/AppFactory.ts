import {
  createState,
  AppConfigRouteInterface,
  WidgetTypeInterface,
  AppFactoryLockedError,
  AppInterface,
  UserService,
  UserAdapterInterface,
  DataService,
  DataAdapterInterface,
  DashboardService,
  TranslationResolverInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  ServicesInterface,
  DashboardAdapterInterface,
  StorageAdapterInterface,
  SourceAdapterInterface,
  NavigationAdapterInterface,
  StorageService,
  NavigationService,
  SourceService,
  AppPluginInterface,
  AlarmService,
  AlarmAdapterInterface,
} from "../../..";

import {
  registerLanguage,
  registerTranslationResolver,
  changeLanguage,
} from "@opendash/i18n";

import enTranslation from "../translations/opendash_en";
import antdTranslationEN from "../translations/antd_en";
import antdTranslationDE from "../translations/antd_de";

type PossibleESModule<T> = T | { default: T };

export class AppFactory {
  private locked: boolean = false;

  private id: string;

  private adapter: {
    User?: UserAdapterInterface;
    Data?: DataAdapterInterface;
    Source?: SourceAdapterInterface;
    Navigation?: NavigationAdapterInterface;
    Dashboard?: DashboardAdapterInterface;
    Alarm?: AlarmAdapterInterface;
    DeviceStorage?: StorageAdapterInterface;
    UserStorage?: StorageAdapterInterface;
  } = {};

  private routes: AppConfigRouteInterface[] = [];
  private widgets: WidgetTypeInterface[] = [];

  private languages: { key: string; label: string; fallback: string }[] = [];

  private translationResolver: Map<
    string,
    TranslationResolverInterface
  > = new Map();

  // context / provider
  private providerRegister: [any, any][] = [];

  // ui settings:
  private staticNavigationGroups: NavigationGroupInterface[] = [];
  private staticNavigationItems: NavigationItemInterface[] = [];

  private disableHeader: boolean = false;
  private disableFooter: boolean = false;
  private logoImage: string = null;
  private logoText: string = null;
  private logoLink: string = null;
  private logoLinkExternal: boolean = false;

  constructor(id: string) {
    this.id = id;

    this.registerTranslationResolver(
      "en",
      "opendash",
      async () => enTranslation
    );

    this.registerTranslationResolver(
      "de",
      "opendash",
      async () => enTranslation
    );

    this.registerTranslationResolver(
      "en",
      "antd",
      async () => antdTranslationEN
    );

    this.registerTranslationResolver(
      "de",
      "antd",
      async () => antdTranslationDE
    );
  }

  async use(plugin: AppPluginInterface): Promise<void> {
    if (this.locked) throw new AppFactoryLockedError("use");

    await Promise.resolve(plugin.onFactory(this));
  }

  registerLanguage(key: string, label: string, fallback: string = "en") {
    if (this.locked) throw new AppFactoryLockedError("registerLanguage");
    this.languages = this.languages.filter((lang) => lang.key !== key);
    this.languages.push({ key, label, fallback });

    registerLanguage(key, label, fallback);
  }

  registerTranslationResolver(
    language: string,
    namespace: string,
    resolver: TranslationResolverInterface
  ) {
    if (this.locked)
      throw new AppFactoryLockedError("registerTranslationResolver");

    // this.translationResolver.set([language, namespace].join(","), resolver);

    registerTranslationResolver(language, namespace, resolver);
  }

  registerDataAdapter(adapter: PossibleESModule<DataAdapterInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerDataAdapter");

    this.adapter.Data = this.extractESModule(adapter);
  }

  registerUserAdapter(adapter: PossibleESModule<UserAdapterInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerUserAdapter");

    this.adapter.User = this.extractESModule(adapter);
  }

  registerDashboardAdapter(
    adapter: PossibleESModule<DashboardAdapterInterface>
  ): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerDashboardAdapter");

    this.adapter.Dashboard = this.extractESModule(adapter);
  }

  registerAlarmAdapter(adapter: PossibleESModule<AlarmAdapterInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerAlarmAdapter");

    this.adapter.Alarm = this.extractESModule(adapter);
  }

  registerSourceAdapter(
    adapter: PossibleESModule<SourceAdapterInterface>
  ): void {
    if (this.locked) throw new AppFactoryLockedError("registerSourceAdapter");

    this.adapter.Source = this.extractESModule(adapter);
  }

  registerNavigationAdapter(
    adapter: PossibleESModule<NavigationAdapterInterface>
  ): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerNavigationAdapter");

    this.adapter.Navigation = this.extractESModule(adapter);
  }

  registerUserStorageAdapter(
    adapter: PossibleESModule<StorageAdapterInterface>
  ): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerUserStorageAdapter");

    this.adapter.UserStorage = this.extractESModule(adapter);
  }

  registerDeviceStorageAdapter(
    adapter: PossibleESModule<StorageAdapterInterface>
  ): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerDeviceStorageAdapter");

    this.adapter.DeviceStorage = this.extractESModule(adapter);
  }

  registerRoute(route: PossibleESModule<AppConfigRouteInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerRoute");

    this.routes.push(this.extractESModule(route));
  }

  registerWidget(widget: PossibleESModule<WidgetTypeInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerWidget");

    this.widgets.push(this.extractESModule(widget));
  }

  registerStaticNavigationGroup(group: NavigationGroupInterface): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerStaticNavigationGroup");

    this.staticNavigationGroups.push(group);
  }

  registerStaticNavigationItem(item: NavigationItemInterface): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerStaticNavigationItem");

    this.staticNavigationItems.push(item);
  }

  get ui() {
    return {
      disableHeader: () => {
        this.disableHeader = true;
      },
      disableFooter: () => {
        this.disableFooter = true;
      },
      setLogoImage: (value: string) => {
        this.logoImage = value;
      },
      setLogoText: (value: string) => {
        this.logoText = value;
      },
      setLogoLink: (value: string) => {
        this.logoLink = value;
      },
      setLogoLinkExternal: (value: boolean) => {
        this.logoLinkExternal = value;
      },
    };
  }

  createApp(): AppInterface {
    try {
      const lang = JSON.parse(window.localStorage.getItem("opendash:language"));

      if (this.languages.find((l) => l.key === lang)) {
        changeLanguage(lang);
      }
    } catch (error) {}

    const state = createState();

    // @ts-ignore
    const services: ServicesInterface = {};

    const app: AppInterface = {
      id: this.id,
      state,
      routes: this.routes,
      widgets: this.widgets,
      services,
      ui: {
        refs: {
          headerBeforeMenuLeft: { current: null },
          headerAfterMenuLeft: { current: null },
          headerBeforeMenuRight: { current: null },
          headerAfterMenuRight: { current: null },
          headerAfterLogo: { current: null },
        },

        disableHeader: this.disableHeader,
        disableFooter: this.disableFooter,
        logoImage: this.logoImage,
        logoText: this.logoText,
        logoLink: this.logoLink,
        logoLinkExternal: this.logoLinkExternal,

        languages: this.languages,
        staticNavigationGroups: this.staticNavigationGroups,
        staticNavigationItems: this.staticNavigationItems,
      },
    };

    services.DeviceStorageService = new StorageService(
      app,
      this.adapter.DeviceStorage
    );

    services.UserService = new UserService(app, this.adapter.User);

    services.UserStorageService = new StorageService(
      app,
      this.adapter.UserStorage
    );

    services.SourceService = new SourceService(app, this.adapter.Source);

    services.DashboardService = new DashboardService(
      app,
      this.adapter.Dashboard
    );

    services.AlarmService = new AlarmService(app, this.adapter.Alarm);

    services.NavigationService = new NavigationService(
      app,
      this.adapter.Navigation
    );

    services.DataService = new DataService(app, this.adapter.Data);

    return app;
  }

  private extractESModule<T = any>(input: PossibleESModule<T>): T {
    // @ts-ignore
    if (input.default) {
      // @ts-ignore
      return input.default;
    }

    return input as T;
  }
}
