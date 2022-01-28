import { WeekDay, StandardWorkingTimes } from "./StandardWorkingTimes";
import { Time } from "./Time";

export const STANDARD_WORKING_TIMES: StandardWorkingTimes = {
    [WeekDay.Monday]: new Time(8, 0),
    [WeekDay.Tuesday]: new Time(8, 0),
    [WeekDay.Wednesday]: new Time(8, 0),
    [WeekDay.Thursday]: new Time(8, 0),
    [WeekDay.Friday]: new Time(8, 0),
    [WeekDay.Saturday]: new Time(0, 0),
    [WeekDay.Sunday]: new Time(0, 0),
};
