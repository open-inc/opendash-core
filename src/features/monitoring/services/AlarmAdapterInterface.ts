import {
  BaseAdapterInterface,
  AlarmAdapterContext,
  AlarmInterface,
} from "../../..";

export interface AlarmAdapterInterface extends BaseAdapterInterface {
  onContext(context: AlarmAdapterContext);

  createAlarm(alarm: Omit<AlarmInterface, "id">): Promise<string>;
  updateAlarm(alarm: AlarmInterface): Promise<void>;
  deleteAlarm(alarm: AlarmInterface): Promise<void>;
}
