import * as React from "react";

import { useOpenDashApp } from "../../..";

import { ServicesInterface } from "../../..";

export function useOpenDashServices(): ServicesInterface {
  const app = useOpenDashApp();

  return app.services;
}
