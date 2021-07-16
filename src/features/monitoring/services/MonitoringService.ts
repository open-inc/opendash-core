import produce from "immer";

import {
  AppInterface,
  BaseService,
  MonitoringAdapterInterface,
  MonitoringAdapterContext,
  DashboardInterface,
  WidgetInterface,
  WidgetTypePresetsInterface,
  WidgetTypeInterface,
  AlarmInterface,
  AlarmWebhookInterface,
  AlarmActionInterface,
  DataItemDimensionIdentifierInterface,
  equals,
} from "../../..";

import { WidgetContext } from "./states/WidgetContext";

type StateInterface = {
  currentDashboard: string | undefined;
  allDashboards: DashboardInterface[];
  allWidgets: WidgetInterface[];

  alarms: AlarmInterface[];
  alarmWebhooks: AlarmWebhookInterface[];
  alarmActions: AlarmActionInterface[];
};

export class MonitoringService extends BaseService<StateInterface> {
  private app: AppInterface;
  private adapter: MonitoringAdapterInterface;
  private context: MonitoringAdapterContext;

  private widgetContextCache = new Map<string, WidgetContext>();

  public readonly triggerTypes = [
    "string_change",
    "string_equals",
    "string_equals_not",
    "string_includes",
    "string_includes_not",
    "string_starts_with",
    "string_starts_with_not",
    "string_ends_with",
    "string_ends_with_not",
    "boolean_change",
    "boolean_true",
    "boolean_false",
    "boolean_rising_edge",
    "boolean_falling_edge",
    "number_change",
    "number_equals",
    "number_equals_not",
    "number_gt",
    "number_lt",
    "number_in_range",
    "number_out_of_range",
  ];

  public readonly actionTypes = ["email", "notification", "webhook"];

  public readonly devices = [
    // {
    //   id: "a",
    //   name: "Device A",
    // },
  ];

  constructor(app: AppInterface, adapter: MonitoringAdapterInterface) {
    super({
      initialState: {
        currentDashboard: undefined,
        allDashboards: [],
        allWidgets: [],

        alarms: [],
        alarmWebhooks: [],
        alarmActions: [],
      },
    });

    this.app = app;
    this.adapter = adapter;
    this.context = new MonitoringAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  public get types(): WidgetTypeInterface[] {
    return this.app.widgets;
  }

  public getDashboard(id: string): DashboardInterface {
    return this.store.getState().allDashboards.find((db) => db.id === id);
  }

  public listDashboards(): DashboardInterface[] {
    return this.store.getState().allDashboards;
  }

  public getCurrentDashboard(): DashboardInterface {
    return this.store.select((state) =>
      state.allDashboards.find(
        (db) =>
          db.id === state.currentDashboard &&
          db.source === this.app.services.SourceService.getCurrent()?.id
      )
    );
  }

  public setCurrentDashboard(dashboard: DashboardInterface): void {
    if (!dashboard.id) {
      console.warn("MonitoringService.setCurrentDashboard(db) db.id missing");
      return;
    }

    this.store.update((draft) => {
      draft.currentDashboard = dashboard?.id;
    });

    this.notifySubscribers();
  }

  public async createDashboard(dashboard: DashboardInterface): Promise<string> {
    // if (!dashboard.id) {
    //   console.warn(
    //     "MonitoringService.createDashboard(dashboard) dashboard.id missing"
    //   );
    //   return;
    // }

    const source = this.app.services.SourceService.getCurrent();

    return await this.adapter.createDashboard({
      ...dashboard,
      source: source?.id,
    });
  }

  public async updateDashboard(dashboard: DashboardInterface): Promise<void> {
    if (!dashboard.id) {
      console.warn(
        "MonitoringService.updateDashboard(dashboard) dashboard.id missing"
      );
      return;
    }

    return await this.adapter.updateDashboard(dashboard);
  }

  public async deleteDashboard(dashboard: DashboardInterface): Promise<void> {
    if (!dashboard.id) {
      console.warn(
        "MonitoringService.deleteDashboard(dashboard) dashboard.id missing"
      );
      return;
    }

    return await this.adapter.deleteDashboard(dashboard);
  }

  getWidgetById(id: string) {
    return this.store.getState().allWidgets.find((widget) => widget.id === id);
  }

  public async createWidget(widget: WidgetInterface): Promise<string> {
    return await this.adapter.createWidget(widget);
  }

  public async updateWidget(widget: WidgetInterface): Promise<void> {
    return await this.adapter.updateWidget(widget);
  }

  public async deleteWidget(widget: WidgetInterface): Promise<void> {
    for (const dashboard of this.listDashboards()) {
      const widgetId = widget.id;

      if (dashboard.widgets.includes(widget.id)) {
        const dashboardUpdate = produce(dashboard, (draft) => {
          draft.widgets = draft.widgets.filter((w) => w !== widgetId);
          draft.layout = draft.layout.filter((l) => l.i !== widgetId);
        });

        await this.updateDashboard(dashboardUpdate);
      }
    }
    return await this.adapter.deleteWidget(widget);
  }

  public async addPresetsToDashboard(
    dashboard: DashboardInterface,
    presets: WidgetTypePresetsInterface[]
  ): Promise<void> {
    const widgets = [];
    const layout = [];

    for (const preset of presets) {
      // @ts-ignore
      const id = await this.createWidget(preset.widget);

      widgets.push(id);

      if (Array.isArray(preset.layout)) {
        const [h, w] = preset.layout;

        layout.push({ i: id, w, h, x: 0, y: 9999 });
      } else {
        layout.push({ i: id, w: 4, h: 4, x: 0, y: 9999 });
      }
    }

    this.updateDashboard({
      ...dashboard,
      widgets: [...dashboard.widgets, ...widgets],
      layout: [...dashboard.layout, ...layout],
    });
  }

  public createWidgetContext(id: string) {
    if (this.widgetContextCache.has(id)) {
      return this.widgetContextCache.get(id);
    }

    const context = new WidgetContext(this, id);

    this.widgetContextCache.set(id, context);

    return context;
  }

  public createWidgetDraftContext() {
    return new WidgetContext(this);
  }

  getAlarm(id: string): AlarmInterface {
    return this.store.select((state) =>
      state.alarms.find((alarm) => alarm.id === id)
    );
  }

  listAlarms(): AlarmInterface[] {
    return this.store.select((state) => state.alarms);
  }

  listAlarmsForItem(
    item: DataItemDimensionIdentifierInterface
  ): AlarmInterface[] {
    try {
      return this.listAlarms().filter((alarm) => equals(alarm.item, item));
    } catch (error) {
      return [];
    }
  }

  async createAlarm(alarm: Omit<AlarmInterface, "id">): Promise<string> {
    return await this.adapter.createAlarm(alarm);
  }

  async updateAlarm(alarm: AlarmInterface): Promise<void> {
    return await this.adapter.updateAlarm(alarm);
  }

  async deleteAlarm(alarm: AlarmInterface): Promise<void> {
    return await this.adapter.deleteAlarm(alarm);
  }

  listWebhooks(): AlarmWebhookInterface[] {
    return this.store.select((state) => state.alarmWebhooks);
  }

  listAlarmActions(): AlarmActionInterface[] {
    return this.store.select((state) => state.alarmActions);
  }
}
