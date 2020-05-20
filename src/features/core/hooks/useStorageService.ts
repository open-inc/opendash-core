import { useOpenDashServices, StorageService } from "../../..";

export function useStorageService(scope: "user" | "device"): StorageService {
  const { UserStorageService, DeviceStorageService } = useOpenDashServices();

  if (scope === "user") {
    return UserStorageService;
  }

  if (scope === "device") {
    return DeviceStorageService;
  }

  throw new Error(`Unknown storage scope '${scope}'`);
}
