import { useOpenDashServices, UserService } from "../../..";

export function useUserService(): UserService {
  const { UserService } = useOpenDashServices();

  return UserService;
}
