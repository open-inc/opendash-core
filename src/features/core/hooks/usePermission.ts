import * as React from "react";
import { useUserService, useServiceStore } from "../../..";

export function usePermission(permission: string): boolean {
  const UserService = useUserService();

  return useServiceStore(UserService, (state) =>
    state.permissions.includes(permission)
  );
}
