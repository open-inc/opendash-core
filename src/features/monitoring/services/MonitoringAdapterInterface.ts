import {
  BaseAdapterInterface,
  MonitoringAdapterContext,
  DashboardInterface,
  WidgetInterface,
  AlarmInterface,
} from "../../..";

export interface MonitoringAdapterInterface extends BaseAdapterInterface {
  onContext(context: MonitoringAdapterContext);

  createDashboard(dashboard: Omit<DashboardInterface, "id">): Promise<string>;
  updateDashboard(dashboard: DashboardInterface): Promise<void>;
  deleteDashboard(dashboard: DashboardInterface): Promise<void>;

  openDashboardSharingDialog?(dashboard: DashboardInterface): Promise<boolean>;

  createWidget(widget: Omit<WidgetInterface, "id">): Promise<string>;
  updateWidget(widget: WidgetInterface): Promise<void>;
  deleteWidget(widget: WidgetInterface): Promise<void>;

  openWidgetSharingDialog?(dashboard: WidgetInterface): Promise<boolean>;

  createAlarm(alarm: Omit<AlarmInterface, "id">): Promise<string>;
  updateAlarm(alarm: AlarmInterface): Promise<void>;
  deleteAlarm(alarm: AlarmInterface): Promise<void>;
}
