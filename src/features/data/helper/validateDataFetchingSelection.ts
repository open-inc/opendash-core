import {
  DataFetchingSelectionInterface,
  DataFetchingOptionsInterface,
} from "../../..";
import { fixDataFetchingSelection } from "./fixDataFetchingSelection";

/**
 *
 * @param config configuration/schema which is required
 * @param value current user? selection
 *
 * @returns An array with two values. (0) The first is a boolean,
 *  true indicates the selection is valid. (1) The second value
 *  will give an hint for why the selectin is invalid or an empty
 *  string if the selection ist valid.
 */
export function validateDataFetchingSelection(
  config: DataFetchingSelectionInterface,
  selection: DataFetchingOptionsInterface
): [boolean, string] {
  if (!config.live && selection.live) {
    return [false, "error.data.live_forbidden"];
  }

  if (config.liveRequired && !selection.live) {
    return [false, "error.data.live_required"];
  }

  if (!config.history && selection.historyType) {
    return [false, "error.data.historyType_forbidden"];
  }

  if (config.history) {
    if (config.historyRequired && !selection.historyType) {
      return [false, "error.data.historyType_required"];
    }

    if (selection.historyType === "absolute") {
      if (!selection.start) {
        return [false, "error.data.start_required"];
      }

      if (!selection.end) {
        return [false, "error.data.end_required"];
      }
    } else if (selection.historyType === "relative") {
      if (!selection.value) {
        return [false, "error.data.value_required"];
      }

      if (!selection.unit) {
        return [false, "error.data.unit_required"];
      }
    } else {
      return [false, "error.data.historyType_invalid"];
    }
  }

  if (config.historyForceRelative && selection.historyType !== "relative") {
    return [false, "error.data.historyType_invalid"];
  }

  if (config.historyForceAbsolute && selection.historyType !== "absolute") {
    return [false, "error.data.historyType_invalid"];
  }

  if (!config.aggregation && selection.aggregation) {
    return [false, "error.data.aggregation_forbidden"];
  }

  if (config.aggregationRequired && !selection.aggregation) {
    return [false, "error.data.aggregation_required"];
  }

  if (!config.resolution && selection.resolution) {
    return [false, "error.data.resolution_forbidden"];
  }

  if (config.resolutionRequired && !selection.resolution) {
    return [false, "error.data.resolution_required"];
  }

  return [true, ""];
}
