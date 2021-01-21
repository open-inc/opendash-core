import produce from "immer";
import {
  AppInterface,
  BaseService,
  DashboardAdapterInterface,
  DashboardAdapterContext,
  DashboardInterface,
  WidgetInterface,
  WidgetTypePresetsInterface,
} from "../../..";

export class DashboardService extends BaseService {
  private app: AppInterface;
  private adapter: DashboardAdapterInterface;
  private context: DashboardAdapterContext;

  constructor(app: AppInterface, adapter: DashboardAdapterInterface) {
    super();

    this.app = app;
    this.adapter = adapter;
    this.context = new DashboardAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  getDashboard(id: string): DashboardInterface {
    return this.app.state.select((state) =>
      state.dashboards.dashboards.find((db) => db.id === id)
    );
  }

  listDashboards(): DashboardInterface[] {
    return this.app.state.select((state) => state.dashboards.dashboards);
  }

  getCurrentDashboard(): DashboardInterface {
    return this.app.state.select((state) =>
      state.dashboards.dashboards.find(
        (db) =>
          db.id === state.dashboards.currentDashboard &&
          db.source === state.sources.current?.id
      )
    );
  }

  setCurrentDashboard(dashboard: DashboardInterface): void {
    if (!dashboard.id) {
      console.warn("DashboardService.setCurrentDashboard(db) db.id missing");
      return;
    }

    this.app.state.update((state) => {
      state.dashboards.currentDashboard = dashboard?.id;
    });

    this.notifySubscribers();
  }

  async createDashboard(dashboard: DashboardInterface): Promise<string> {
    // if (!dashboard.id) {
    //   console.warn(
    //     "DashboardService.createDashboard(dashboard) dashboard.id missing"
    //   );
    //   return;
    // }

    const source = this.app.services.SourceService.getCurrent();

    return await this.adapter.createDashboard({
      ...dashboard,
      source: source?.id,
    });
  }

  async updateDashboard(dashboard: DashboardInterface): Promise<void> {
    if (!dashboard.id) {
      console.warn(
        "DashboardService.updateDashboard(dashboard) dashboard.id missing"
      );
      return;
    }

    return await this.adapter.updateDashboard(dashboard);
  }

  async deleteDashboard(dashboard: DashboardInterface): Promise<void> {
    if (!dashboard.id) {
      console.warn(
        "DashboardService.deleteDashboard(dashboard) dashboard.id missing"
      );
      return;
    }

    return await this.adapter.deleteDashboard(dashboard);
  }

  async createWidget(widget: WidgetInterface): Promise<string> {
    return await this.adapter.createWidget(widget);
  }

  async updateWidget(widget: WidgetInterface): Promise<void> {
    return await this.adapter.updateWidget(widget);
  }

  async deleteWidget(widget: WidgetInterface): Promise<void> {
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

  async addPresetsToDashboard(
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

        layout.push({ i: id, w, h, x: 0, y: 0 });
      } else {
        layout.push({ i: id, w: 4, h: 4, x: 0, y: 0 });
      }
    }

    this.updateDashboard({
      ...dashboard,
      widgets: [...dashboard.widgets, ...widgets],
      layout: [...dashboard.layout, ...layout],
    });
  }
}
