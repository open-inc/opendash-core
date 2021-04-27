import {
  DashboardInterface,
  WidgetInterface,
  MonitoringService,
  AppInterface,
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
}
