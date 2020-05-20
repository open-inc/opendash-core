export interface DataFetchingSelectionInterface {
  live?: boolean;
  liveRequired?: boolean;
  history?: boolean;
  historyRequired?: boolean;
  historyForceRelative?: boolean;
  aggregation?: boolean;
  aggregationRequired?: boolean;
  resolution?: boolean;
  resolutionRequired?: boolean;
}
