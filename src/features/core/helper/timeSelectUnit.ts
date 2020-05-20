// selectUnit is from: https://github.com/formatjs/formatjs/blob/master/packages/intl-utils/src/diff.ts

type Unit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

const MS_PER_SECOND = 1000;
const SECS_PER_MIN = 60;
const SECS_PER_HOUR = SECS_PER_MIN * 60;
const SECS_PER_DAY = SECS_PER_HOUR * 24;
const SECS_PER_WEEK = SECS_PER_DAY * 7;

const THRESHOLDS = {
  second: 60, // seconds to minute
  minute: 60, // minutes to hour
  hour: 24, // hour to day
  day: 7, // day to week
};

export function timeSelectUnit(
  from: Date | number,
  to: Date | number = Date.now()
): [number, Unit] {
  const secs = (from.valueOf() - to.valueOf()) / MS_PER_SECOND;

  if (Math.abs(secs) < THRESHOLDS.second) {
    return [Math.round(secs), "second"];
  }

  const mins = secs / SECS_PER_MIN;

  if (Math.abs(mins) < THRESHOLDS.minute) {
    return [Math.round(mins), "minute"];
  }

  const hours = secs / SECS_PER_HOUR;

  if (Math.abs(hours) < THRESHOLDS.hour) {
    return [Math.round(hours), "hour"];
  }

  const days = secs / SECS_PER_DAY;

  if (Math.abs(days) < THRESHOLDS.day) {
    return [Math.round(days), "day"];
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const years = fromDate.getFullYear() - toDate.getFullYear();

  if (Math.round(Math.abs(years)) > 0) {
    return [Math.round(years), "year"];
  }

  const months = years * 12 + fromDate.getMonth() - toDate.getMonth();

  if (Math.round(Math.abs(months)) > 0) {
    return [Math.round(months), "month"];
  }
  const weeks = secs / SECS_PER_WEEK;

  return [Math.round(weeks), "week"];
}
