import {
  BaseAdapterInterface,
  MonitoringAdapterContext,
  DashboardInterface,
  WidgetInterface,
} from "../../..";

export interface MonitoringAdapterInterface extends BaseAdapterInterface {
  onContext(context: MonitoringAdapterContext);

  createDashboard(dashboard: DashboardInterface): Promise<string>;
  updateDashboard(dashboard: DashboardInterface): Promise<void>;
  deleteDashboard(dashboard: DashboardInterface): Promise<void>;

  createWidget(widget: WidgetInterface): Promise<string>;
  updateWidget(widget: WidgetInterface): Promise<void>;
  deleteWidget(widget: WidgetInterface): Promise<void>;
}
