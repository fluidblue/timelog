import { Time } from "./Time";

export enum WeekDay {
    Monday = 0,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export type StandardWorkingTimes = {
    [key in WeekDay]: Time;
};
