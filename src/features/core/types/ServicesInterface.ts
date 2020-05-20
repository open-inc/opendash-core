import {
  UserService,
  DataService,
  DashboardService,
  StorageService,
  SourceService,
  NavigationService,
} from "../../..";

export interface ServicesInterface {
  UserService: UserService;
  SourceService: SourceService;
  NavigationService: NavigationService;
  DashboardService: DashboardService;

  DeviceStorageService: StorageService;
  UserStorageService: StorageService;

  DataService: DataService;
}
