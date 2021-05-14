import React from "react";
import { useUserService, useServiceStore, UserInterface } from "../../..";

export function useCurrentUser(): UserInterface {
  const UserService = useUserService();

  return useServiceStore(
    UserService,
    React.useCallback((state) => state.currentUser, [])
  );
}
