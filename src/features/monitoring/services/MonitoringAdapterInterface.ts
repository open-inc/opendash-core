import {
  BaseAdapterInterface,
  MonitoringAdapterContext,
  DashboardInterface,
  WidgetInterface,
  AlarmInterface,
} from "../../..";

export interface MonitoringAdapterInterface extends BaseAdapterInterface {
  onContext(context: MonitoringAdapterContext);

  createDashboard(dashboard: DashboardInterface): Promise<string>;
  updateDashboard(dashboard: DashboardInterface): Promise<void>;
  deleteDashboard(dashboard: DashboardInterface): Promise<void>;

  createWidget(widget: WidgetInterface): Promise<string>;
  updateWidget(widget: WidgetInterface): Promise<void>;
  deleteWidget(widget: WidgetInterface): Promise<void>;

  createAlarm(alarm: Omit<AlarmInterface, "id">): Promise<string>;
  updateAlarm(alarm: AlarmInterface): Promise<void>;
  deleteAlarm(alarm: AlarmInterface): Promise<void>;
}
