import { Time } from "./Time";

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
