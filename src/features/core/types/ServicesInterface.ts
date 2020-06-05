import {
  UserService,
  DataService,
  DashboardService,
  StorageService,
  SourceService,
  NavigationService,
  AlarmService,
} from "../../..";

export interface ServicesInterface {
  UserService: UserService;
  SourceService: SourceService;
  NavigationService: NavigationService;

  DashboardService: DashboardService;
  AlarmService: AlarmService;

  DeviceStorageService: StorageService;
  UserStorageService: StorageService;

  DataService: DataService;
}
