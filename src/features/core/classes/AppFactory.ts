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
  MonitoringService,
  TranslationResolverInterface,
  NavigationGroupInterface,
  NavigationItemInterface,
  ServicesInterface,
  MonitoringAdapterInterface,
  StorageAdapterInterface,
  SourceAdapterInterface,
  NavigationAdapterInterface,
  StorageService,
  NavigationService,
  SourceService,
  AppPluginInterface,
  AlarmService,
  AlarmAdapterInterface,
  AuthDefaultLoginForm,
  AuthDefaultSignupForm,
  AuthFormComponentInterface,
} from "../../..";

import {
  registerLanguage,
  registerTranslationResolver,
  changeLanguage,
} from "@opendash/i18n";

import { setIconClassName } from "@opendash/icons";

import enTranslation from "../translations/opendash_en";

import { Locale } from "antd/lib/locale-provider";

type PossibleESModule<T> = T | { default: T };

export class AppFactory {
  private locked: boolean = false;

  private id: string;

  private adapter: {
    User?: UserAdapterInterface;
    Data?: DataAdapterInterface;
    Source?: SourceAdapterInterface;
    Navigation?: NavigationAdapterInterface;
    Monitoring?: MonitoringAdapterInterface;
    Alarm?: AlarmAdapterInterface;
    DeviceStorage?: StorageAdapterInterface;
    UserStorage?: StorageAdapterInterface;
  } = {};

  private routes: AppConfigRouteInterface[] = [];
  private widgets: WidgetTypeInterface[] = [];

  private languages: {
    key: string;
    label: string;
    fallback: string;
    isDefault: boolean;
  }[] = [];

  // ui settings:
  private authLoginForm: AuthFormComponentInterface = AuthDefaultLoginForm;
  private authSignupForm: AuthFormComponentInterface = AuthDefaultSignupForm;

  private staticNavigationGroups: NavigationGroupInterface[] = [];
  private staticNavigationItems: NavigationItemInterface[] = [];

  private disableHeader: boolean = false;
  private disableHeaderSourcePicker: boolean = false;
  private disableFooter: boolean = false;
  private logoImage: string = null;
  private logoText: string = null;
  private logoLink: string = null;
  private logoLinkExternal: boolean = false;

  constructor(id: string) {
    this.id = id;

    setIconClassName("anticon");

    this.registerTranslationResolver(
      "en",
      "opendash",
      async () => enTranslation
    );
  }

  async use(plugin: AppPluginInterface): Promise<void> {
    if (this.locked) throw new AppFactoryLockedError("use");

    await Promise.resolve(plugin.onFactory(this));
  }

  registerLanguage(
    key: string,
    label: string,
    fallback: string = undefined,
    isDefault: boolean = false
  ) {
    if (this.locked) throw new AppFactoryLockedError("registerLanguage");
    this.languages = this.languages.filter((lang) => lang.key !== key);
    this.languages.push({ key, label, fallback, isDefault });

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

  registerAntDesignTranslation(
    language: string,
    resolver: () => Promise<{ default: Locale }>
  ) {
    if (this.locked)
      throw new AppFactoryLockedError("registerAntDesignTranslation");

    registerTranslationResolver(language, "antd", async () => {
      const { default: translation } = await resolver();

      return { json: JSON.stringify(translation) };
    });
  }

  registerDataAdapter(adapter: PossibleESModule<DataAdapterInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerDataAdapter");

    this.adapter.Data = this.extractESModule(adapter);
  }

  registerUserAdapter(adapter: PossibleESModule<UserAdapterInterface>): void {
    if (this.locked) throw new AppFactoryLockedError("registerUserAdapter");

    this.adapter.User = this.extractESModule(adapter);
  }

  registerMonitoringAdapter(
    adapter: PossibleESModule<MonitoringAdapterInterface>
  ): void {
    if (this.locked)
      throw new AppFactoryLockedError("registerMonitoringAdapter");

    this.adapter.Monitoring = this.extractESModule(adapter);
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
      disableHeaderSourcePicker: () => {
        this.disableHeaderSourcePicker = true;
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
      setAuthLoginForm: (value: AuthFormComponentInterface) => {
        this.authLoginForm = value;
      },
      setAuthSignupForm: (value: AuthFormComponentInterface) => {
        this.authSignupForm = value;
      },
    };
  }

  createApp(): AppInterface {
    try {
      let lang = this.languages.find(
        (l) =>
          l.key === JSON.parse(window.localStorage.getItem("opendash:language"))
      )?.key;

      if (!lang) {
        lang = this.languages.find((l) => l.isDefault)?.key;
      }

      if (!lang) {
        lang = this.languages[0]?.key;
      }

      changeLanguage(lang);
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
          content: { current: null },
          headerBeforeMenuLeft: { current: null },
          headerAfterMenuLeft: { current: null },
          headerBeforeMenuRight: { current: null },
          headerAfterMenuRight: { current: null },
          headerBeforeLogo: { current: null },
          headerAfterLogo: { current: null },
        },

        authLoginForm: this.authLoginForm,
        authSignupForm: this.authSignupForm,

        disableHeader: this.disableHeader,
        disableHeaderSourcePicker: this.disableHeaderSourcePicker,
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

    services.MonitoringService = new MonitoringService(
      app,
      this.adapter.Monitoring
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
