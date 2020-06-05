import {
  AppInterface,
  BaseService,
  AlarmAdapterInterface,
  AlarmAdapterContext,
  AlarmInterface,
  AlarmWebhookInterface,
  DataItemDimensionIdentifierInterface,
  equals,
} from "../../..";

export class AlarmService extends BaseService {
  private app: AppInterface;
  private adapter: AlarmAdapterInterface;
  private context: AlarmAdapterContext;

  public readonly triggerTypes = [
    "string_change",
    "string_equals",
    "string_contains",
    "string_starts_with",
    "string_ends_with",
    "boolean_rising_edge",
    "boolean_falling_edge",
    "boolean_change",
    "boolean_true",
    "boolean_false",
    "number_change",
    "number_equals",
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

  public get webhooks(): AlarmWebhookInterface[] {
    return this.app.state.select((state) => state.dashboards.alarmWebhooks);
  }

  constructor(app: AppInterface, adapter: AlarmAdapterInterface) {
    super();

    this.app = app;
    this.adapter = adapter;
    this.context = new AlarmAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  getAlarm(id: string): AlarmInterface {
    return this.app.state.select((state) =>
      state.dashboards.alarms.find((alarm) => alarm.id === id)
    );
  }

  listAlarms(): AlarmInterface[] {
    return this.app.state.select((state) => state.dashboards.alarms);
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
}
