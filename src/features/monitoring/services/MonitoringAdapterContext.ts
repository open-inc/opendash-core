import {
  DashboardInterface,
  WidgetInterface,
  MonitoringService,
  AppInterface,
  AlarmInterface,
  AlarmWebhookInterface,
  AlarmActionInterface,
} from "../../..";

export class MonitoringAdapterContext {
  private service: MonitoringService;

  constructor(service: MonitoringService, app: AppInterface) {
    this.service = service;
  }

  setLoading(value: boolean) {
    this.service.setLoading(value);
  }

  setDashboards(dashboards: Array<DashboardInterface>) {
    this.service.store.update((state) => {
      state.allDashboards = dashboards;
    });
  }

  updateDashboard(id: string, dashboard: DashboardInterface) {
    this.service.store.update((state) => {
      const item = state.allDashboards.find((i) => i.id === id);

      // create
      if (!item && dashboard) {
        state.allDashboards.push(dashboard);
      }

      // delete
      if (item && !dashboard) {
        state.allDashboards = state.allDashboards.filter((i) => i !== item);
      }

      // update
      if (item) {
        Object.assign(item, dashboard);
      }
    });
  }

  setWidgets(widgets: Array<WidgetInterface>) {
    this.service.store.update((state) => {
      state.allWidgets = widgets;
    });
  }

  updateWidget(id: string, widget: WidgetInterface) {
    this.service.store.update((state) => {
      const item = state.allWidgets.find((i) => i.id === id);

      // create
      if (!item && widget) {
        state.allWidgets.push(widget);
      }

      // delete
      if (item && !widget) {
        state.allWidgets = state.allWidgets.filter((i) => i !== item);
      }

      // update
      if (item) {
        Object.assign(item, widget);
      }
    });
  }

  setAlarms(Alarms: Array<AlarmInterface>) {
    this.service.store.update((state) => {
      state.alarms = Alarms;
    });
  }

  updateAlarm(id: string, Alarm: AlarmInterface) {
    this.service.store.update((state) => {
      const item = state.alarms.find((i) => i.id === id);

      // create
      if (!item && Alarm) {
        state.alarms.push(Alarm);
      }

      // delete
      if (item && !Alarm) {
        state.alarms = state.alarms.filter((i) => i !== item);
      }

      // update
      if (item && Alarm) {
        Object.assign(item, Alarm);
      }
    });
  }

  setAlarmWebhooks(hook: AlarmWebhookInterface[]) {
    this.service.store.update((state) => {
      state.alarmWebhooks = hook;
    });
  }

  updateAlarmWebhooks(id: string, hook: AlarmWebhookInterface) {
    this.service.store.update((state) => {
      const item = state.alarmWebhooks.find((i) => i.id === id);

      // create
      if (!item && hook) {
        state.alarmWebhooks.push(hook);
      }

      // delete
      if (item && !hook) {
        state.alarmWebhooks = state.alarmWebhooks.filter((i) => i !== item);
      }

      // update
      if (item && hook) {
        Object.assign(item, hook);
      }
    });
  }

  setAlarmAction(hook: AlarmActionInterface[]) {
    this.service.store.update((state) => {
      state.alarmActions = hook;
    });
  }

  updateAlarmAction(id: string, hook: AlarmActionInterface) {
    this.service.store.update((state) => {
      const item = state.alarmActions.find((i) => i.id === id);

      // create
      if (!item && hook) {
        state.alarmActions.push(hook);
      }

      // delete
      if (item && !hook) {
        state.alarmActions = state.alarmActions.filter((i) => i !== item);
      }

      // update
      if (item && hook) {
        Object.assign(item, hook);
      }
    });
  }
}
