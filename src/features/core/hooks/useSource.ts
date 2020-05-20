import * as React from "react";

import { useOpenDashServices, useForceRender, SourceInterface } from "../../..";

type useSourceResult = [
  SourceInterface,
  (input: string) => void,
  SourceInterface[],
  boolean,
  boolean
];

export function useSource(): useSourceResult {
  const { SourceService } = useOpenDashServices();

  const forceRender = useForceRender();

  React.useEffect(() => {
    return SourceService.subscribe(() => {
      forceRender();
    });
  }, []);

  return [
    SourceService.getCurrent(),
    React.useCallback((input: string) => {
      SourceService.setCurrent(input);
    }, []),
    SourceService.getAll(),
    SourceService.isLoading(),
    SourceService.isEnabled(),
  ];
}
