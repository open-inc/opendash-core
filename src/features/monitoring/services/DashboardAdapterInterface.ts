import {
  BaseAdapterInterface,
  DashboardAdapterContext,
  DashboardInterface,
  WidgetInterface,
} from "../../..";

export interface DashboardAdapterInterface extends BaseAdapterInterface {
  onContext(context: DashboardAdapterContext);

  createDashboard(dashboard: DashboardInterface): Promise<string>;
  updateDashboard(dashboard: DashboardInterface): Promise<void>;
  deleteDashboard(dashboard: DashboardInterface): Promise<void>;

  createWidget(widget: WidgetInterface): Promise<string>;
  updateWidget(widget: WidgetInterface): Promise<void>;
  deleteWidget(widget: WidgetInterface): Promise<void>;
}
