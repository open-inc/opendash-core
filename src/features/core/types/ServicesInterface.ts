import {
  UserService,
  DataService,
  MonitoringService,
  StorageService,
  SourceService,
  NavigationService,
  AlarmService,
} from "../../..";

export interface ServicesInterface {
  UserService: UserService;
  SourceService: SourceService;
  NavigationService: NavigationService;

  MonitoringService: MonitoringService;
  AlarmService: AlarmService;

  DeviceStorageService: StorageService;
  UserStorageService: StorageService;

  DataService: DataService;
}
