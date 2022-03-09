import { Time } from "./Time";

export interface WorkingTimesJson {
	monday: number;
	tuesday: number;
	wednesday: number;
	thursday: number;
	friday: number;
	saturday: number;
	sunday: number;
}

export type WeekDayJson = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface SettingsJson {
	weekStartsOn: WeekDayJson;
	workingTimes: WorkingTimesJson;
}

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
    startOfWeek: WeekDayJson
    standardWorkingTimes: StandardWorkingTimes
}
