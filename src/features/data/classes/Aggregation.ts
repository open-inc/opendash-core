import {
  min,
  max,
  sum,
  mean,
  variance,
  standardDeviation,
} from "simple-statistics";

import moment from "moment";

import {
  AggregationPotInterface,
  DateUnitInterface,
  DateUnitGroupedInterface,
  AggregationOperationInterface,
} from "../../..";

interface Value {
  date: number;
  value: number;
}

export class Aggregation {
  public static SECOND_IN_MS: number = 1000;
  public static MINUTE_IN_MS: number = Aggregation.SECOND_IN_MS * 60;
  public static HOUR_IN_MS: number = Aggregation.MINUTE_IN_MS * 60;
  public static DAY_IN_MS: number = Aggregation.HOUR_IN_MS * 24;
  public static WEEK_IN_MS: number = Aggregation.DAY_IN_MS * 7;

  public static aggregate(
    aggregation: AggregationOperationInterface,
    pots: AggregationPotInterface[],
    values: Value[]
  ): Value[] {
    const valuesInPots = Aggregation._distributeIntoPots(pots, values);
    const aggregationFunction = Aggregation._resolveAggregationFunction(
      aggregation
    );

    const result = valuesInPots
      .map((valuePot, i) => ({
        date: pots[i].date,
        value: aggregationFunction(valuePot),
      }))
      .filter(({ value }) => value !== undefined);

    return result;
  }

  private static _resolveAggregationFunction(
    aggregation: AggregationOperationInterface
  ) {
    switch (aggregation) {
      case "min":
        return (arr) => {
          try {
            return min(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "max":
        return (arr) => {
          try {
            return max(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "sum":
        return (arr) => {
          try {
            return sum(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "mean":
      case "avg":
        return (arr) => {
          try {
            return mean(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "stdd":
        return (arr) => {
          try {
            return standardDeviation(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "variance":
        return (arr) => {
          try {
            return variance(arr);
          } catch (error) {
            return undefined;
          }
        };
      case "count":
        return (arr) => arr.length;

      default:
        throw new Error(`Unknown parameter aggregation '${aggregation}'`);
    }
  }

  private static _distributeIntoPots(
    pots: AggregationPotInterface[],
    values: Value[]
  ): number[][] {
    console.log("_distributeIntoPots start");
    let now = Date.now();
    const results: number[][] = pots.map(() => []);

    const bounds = pots
      .flatMap((pot, i) =>
        pot.bounds.map((bound) => [i, bound.start, bound.end])
      )
      .sort((a, b) => a[1] - b[1]);

    console.log(
      "_distributeIntoPots createBounds",
      Date.now() - now,
      "ms count:",
      bounds.length
    );

    now = Date.now();
    let lastMatch = 0;

    for (const { date, value } of values) {
      for (let i = lastMatch; i < bounds.length; i++) {
        if (bounds[i][1] <= date && date <= bounds[i][2]) {
          results[bounds[i][0]].push(value);
          lastMatch = i;
        }
      }
    }

    console.log("_distributeIntoPots fill pots", Date.now() - now, "ms");

    return results;
  }

  public static createPotsFromSplits(
    start: number,
    end: number,
    splits: number
  ): AggregationPotInterface[] {
    const diff = end - start;

    const potSize = Math.ceil(diff / splits);

    const result = [];

    let lastEnd = Math.floor(start);

    for (let i = 0; i < splits; i++) {
      let localStart = lastEnd;
      lastEnd = localStart + potSize;

      result.push({
        date: localStart,
        bounds: [
          {
            start: localStart,
            end: lastEnd,
          },
        ],
      });
    }

    return result;
  }

  public static createPotsFromUnit(
    start: number,
    end: number,
    unit: DateUnitInterface
  ): AggregationPotInterface[] {
    let localStart = null;
    let localEnd = start - 1;

    const result = [];

    if (unit === "week") {
      // Fix for moment.js to start on monday
      // @ts-ignore
      unit = "isoWeek";
    }

    while (true) {
      localStart = localEnd + 1;
      localEnd = Math.min(moment(localStart).endOf(unit).valueOf(), end);

      result.push({
        date: localStart,
        bounds: [
          {
            start: localStart,
            end: localEnd,
          },
        ],
      });

      if (localEnd >= end) {
        break;
      }
    }

    return result;
  }

  /**
   * date will be the index of the unit instead of an actual date.
   * minuteOfHour, hourOfDay, hourOfWeek start at 0
   * dayOfWeek, dayOfMonth, dayOfYear, weekOfYear, monthOfYear start at 1
   */
  public static createPotsFromUnitGrouped(
    start: number,
    end: number,
    group: DateUnitGroupedInterface
  ): AggregationPotInterface[] {
    const unit = Aggregation._createPotsFromUnitGroupedUnit(group);
    const getIndex = Aggregation._createPotsFromUnitGroupedIndex(group);

    const result: Record<number, AggregationPotInterface> = {};

    let localStart = null;
    let localEnd = moment(start).startOf(unit).valueOf() - 1;

    while (true) {
      localStart = localEnd + 1;
      localEnd = Math.min(moment(localStart).endOf(unit).valueOf(), end);

      const index = getIndex(localStart);

      if (!result[index]) {
        result[index] = {
          date: index,
          bounds: [],
        };
      }

      result[index].bounds.push({ start: localStart, end: localEnd });

      if (localEnd >= end) {
        break;
      }
    }

    return Object.values(result);
  }

  private static _createPotsFromUnitGroupedUnit(
    group: DateUnitGroupedInterface
  ) {
    switch (group) {
      case "minuteOfHour":
        return "minute";
      case "hourOfDay":
      case "hourOfWeek":
        return "hour";
      case "dayOfWeek":
      case "dayOfMonth":
      case "dayOfYear":
        return "day";
      case "weekOfYear":
        return "isoWeek";
      case "monthOfYear":
        return "month";
      default:
        throw new Error(
          `createPotsFromUnitGrouped: Unknown parameter group '${group}'`
        );
    }
  }

  private static _createPotsFromUnitGroupedIndex(
    group: DateUnitGroupedInterface
  ): (date: number) => number {
    switch (group) {
      case "minuteOfHour":
        return (date: number) => moment(date).minute();
      case "hourOfDay":
        return (date: number) => moment(date).hour();
      case "hourOfWeek":
        return (date: number) => {
          const hour = moment(date).hour();
          const day = moment(date).isoWeekday() - 1;
          return day * 24 + hour;
        };
      case "dayOfWeek":
        return (date: number) => moment(date).isoWeekday() - 1;
      case "dayOfMonth":
        return (date: number) => moment(date).date() - 1;
      case "dayOfYear":
        return (date: number) => moment(date).dayOfYear() - 1;
      case "weekOfYear":
        return (date: number) => moment(date).isoWeekYear() - 1;
      case "monthOfYear":
        return (date: number) => moment(date).month();
      default:
        throw new Error(
          `createPotsFromUnitGrouped: Unknown parameter group '${group}'`
        );
    }
  }
}
