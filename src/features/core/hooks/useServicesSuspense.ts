import * as React from "react";
import { useOpenDashServices, useForceRender } from "../../..";

const warnings = [];

export function useServicesSuspense(): void {
  const services = useOpenDashServices();
  const forceRender = useForceRender();

  for (const [name, service] of Object.entries(services)) {
    const skip =
      !services.UserService.isLoading() && !services.UserService.isLoggedIn();

    if (!service.isEnabled()) {
      if (!warnings.includes(name)) {
        console.warn(
          `Service '${name}' is disabled. Please check if there is an missing adapter.`
        );

        warnings.push(name);
      }

      continue;
    }

    if (!skip && service.isLoading()) {
      throw service.wait();
    }

    React.useEffect(() => {
      if (!skip) {
        return service.subscribe(() => {
          forceRender();
        });
      }
    }, []);
  }
}
