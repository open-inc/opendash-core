import * as React from "react";
import { useAppState } from "../../..";

export function usePermission(permission: string): boolean {
  return useAppState((state) => state.user.permissions.includes(permission));
}
