import {
  UserService,
  DataService,
  MonitoringService,
  StorageService,
  SourceService,
  NavigationService,
} from "../../..";

export interface ServicesInterface {
  UserService: UserService;
  SourceService: SourceService;
  NavigationService: NavigationService;

  MonitoringService: MonitoringService;

  DeviceStorageService: StorageService;
  UserStorageService: StorageService;

  DataService: DataService;
}
