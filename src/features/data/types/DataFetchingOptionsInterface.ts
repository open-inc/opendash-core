type UnixTimestampMilliseconds = number;

import {
  AggregationPotInterface,
  DateUnitInterface,
  DateUnitGroupedInterface,
  AggregationOperationInterface,
} from "../../..";

export interface DataFetchingOptionsInterface {
  live?: boolean;

  historyType?: "relative" | "absolute";
  historyRelativeSnap?: boolean;
  historyRelativeOffset?: number;
  start?: UnixTimestampMilliseconds;
  end?: UnixTimestampMilliseconds;
  value?: number;
  unit?: DateUnitInterface;
  unitDisableSnapping?: boolean;
  limit?: number;

  resolution?: boolean;
  resolutionMode?: "minmax" | "drop";
  resolutionMaxValues?: number;

  aggregation?: boolean;
  aggregationPots?: AggregationPotInterface[];
  aggregationSplits?: number;
  aggregationSteps?: DateUnitInterface;
  aggregationGroup?: DateUnitGroupedInterface;
  aggregationOperation?: AggregationOperationInterface;
}
