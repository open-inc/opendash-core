import {
  AlarmInterface,
  AlarmWebhookInterface,
  AlarmService,
  AppInterface,
} from "../../..";

export class AlarmAdapterContext {
  private service: AlarmService;
  private app: AppInterface;

  constructor(service: AlarmService, app: AppInterface) {
    this.service = service;
    this.app = app;
  }

  setLoading(value: boolean) {
    this.service.setLoading(value);
  }

  setAlarms(Alarms: Array<AlarmInterface>) {
    this.app.state.update((state) => {
      state.dashboards.alarms = Alarms;
    });
  }

  updateAlarm(id: string, Alarm: AlarmInterface) {
    this.app.state.update((state) => {
      const item = state.dashboards.alarms.find((i) => i.id === id);

      // create
      if (!item && Alarm) {
        state.dashboards.alarms.push(Alarm);
      }

      // delete
      if (item && !Alarm) {
        state.dashboards.alarms = state.dashboards.alarms.filter(
          (i) => i !== item
        );
      }

      // update
      if (item && Alarm) {
        Object.assign(item, Alarm);
      }
    });
  }

  setWebhooks(hook: AlarmWebhookInterface[]) {
    this.app.state.update((state) => {
      state.dashboards.alarmWebhooks = hook;
    });
  }

  updateWebhooks(id: string, hook: AlarmWebhookInterface) {
    this.app.state.update((state) => {
      const item = state.dashboards.alarmWebhooks.find((i) => i.id === id);

      // create
      if (!item && hook) {
        state.dashboards.alarmWebhooks.push(hook);
      }

      // delete
      if (item && !hook) {
        state.dashboards.alarmWebhooks = state.dashboards.alarmWebhooks.filter(
          (i) => i !== item
        );
      }

      // update
      if (item && hook) {
        Object.assign(item, hook);
      }
    });
  }
}
