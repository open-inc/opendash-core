import {
  DashboardInterface,
  WidgetInterface,
  DashboardService,
  AppInterface,
} from "../../..";

export class DashboardAdapterContext {
  private service: DashboardService;
  private app: AppInterface;

  constructor(service: DashboardService, app: AppInterface) {
    this.service = service;
    this.app = app;
  }

  setLoading(value: boolean) {
    this.service.setLoading(value);
  }

  setDashboards(dashboards: Array<DashboardInterface>) {
    this.app.state.update((state) => {
      state.dashboards.dashboards = dashboards;
    });
  }

  updateDashboard(id: string, dashboard: DashboardInterface) {
    this.app.state.update((state) => {
      const item = state.dashboards.dashboards.find((i) => i.id === id);

      // create
      if (!item && dashboard) {
        state.dashboards.dashboards.push(dashboard);
      }

      // delete
      if (item && !dashboard) {
        state.dashboards.dashboards = state.dashboards.dashboards.filter(
          (i) => i !== item
        );
      }

      // update
      if (item) {
        Object.assign(item, dashboard);
      }
    });
  }

  setWidgets(widgets: Array<WidgetInterface>) {
    this.app.state.update((state) => {
      state.dashboards.widgets = widgets;
    });
  }

  updateWidget(id: string, widget: WidgetInterface) {
    this.app.state.update((state) => {
      const item = state.dashboards.widgets.find((i) => i.id === id);

      // create
      if (!item && widget) {
        state.dashboards.widgets.push(widget);
      }

      // delete
      if (item && !widget) {
        state.dashboards.widgets = state.dashboards.widgets.filter(
          (i) => i !== item
        );
      }

      // update
      if (item) {
        Object.assign(item, widget);
      }
    });
  }
}
