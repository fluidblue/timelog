import { Time } from "./Time";

export type WeekDayStringLiterals = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export enum WeekDay {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export type StandardWorkingTimes = {
    [key: number]: Time;
};

export interface Settings {
    startOfWeek: WeekDayStringLiterals
    standardWorkingTimes: StandardWorkingTimes
}
