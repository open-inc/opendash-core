import produce from "immer";
import moment from "moment";

import {
  Aggregation,
  DataFetchingOptionsInterface,
  AggregationPotInterface,
  DateUnitInterface,
  DateUnitGroupedInterface,
  AggregationOperationInterface,
} from "../../..";

export function evaluateDataFetchingOptions(
  option: DataFetchingOptionsInterface
): DataFetchingOptionsInterface {
  return produce(option, (draft) => {
    if (draft.historyType === "relative") {
      if (draft.unit === "week") {
        // TODO
        // use this for moment.js untill we implement user settings
        // for start of week
        // @ts-ignore
        draft.unit = "isoWeek";
      }

      draft.historyType = "absolute";

      draft.end = draft.historyRelativeSnap
        ? moment().endOf(draft.unit).valueOf() + 1
        : moment().endOf("minute").valueOf() + 1;

      if (draft.historyRelativeOffset) {
        draft.end = moment(draft.end)
          .add(draft.value * draft.historyRelativeOffset, draft.unit)
          .valueOf();
      }

      draft.start = moment(draft.end)
        .subtract(draft.value, draft.unit)
        .valueOf();

      draft.value = undefined;
      draft.unit = undefined;
      draft.historyRelativeSnap = undefined;
    }

    if (draft.aggregationSplits) {
      draft.aggregationPots = Aggregation.createPotsFromSplits(
        draft.start,
        draft.end,
        draft.aggregationSplits
      );

      draft.aggregationSplits = undefined;
    }

    if (draft.aggregationSteps) {
      // const splits = moment(draft.start).diff(
      //   draft.end,
      //   draft.aggregationSteps,
      //   true
      // );

      // if (Number.isInteger(splits)) {
      //   draft.aggregationSplits = splits;
      // } else {
      //   console.warn(
      //     "DataFetchingOptionsInterface.aggregationSteps is ignored, as the resulting value for aggregationSplits is not an integer."
      //   );
      // }

      draft.aggregationPots = Aggregation.createPotsFromUnit(
        draft.start,
        draft.end,
        draft.aggregationSteps
      );

      draft.aggregationSteps = undefined;
    }

    if (draft.aggregationGroup) {
      draft.aggregationPots = Aggregation.createPotsFromUnitGrouped(
        draft.start,
        draft.end,
        draft.aggregationGroup
      );

      draft.aggregationGroup = undefined;
    }

    if (
      !draft.aggregation ||
      !draft.aggregationOperation ||
      !draft.aggregationPots
    ) {
      draft.aggregation = undefined;
      draft.aggregationPots = undefined;
      draft.aggregationOperation = undefined;
    }

    if (
      !draft.resolution ||
      !draft.resolutionMode ||
      !Number.isInteger(draft.resolutionMaxValues)
    ) {
      draft.resolution = undefined;
      draft.resolutionMode = undefined;
      draft.resolutionMaxValues = undefined;
    } else {
      draft.resolutionMaxValues = Math.abs(draft.resolutionMaxValues);
    }
  });
}
