import { Time } from "@angular/common";

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
