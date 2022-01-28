import { Time } from "./Time";
import { WorkingTime } from "./WorkingTime";

export interface WorkingTimes {
    [key: number]: WorkingTime[]
}

export const WORKING_TIMES: WorkingTimes = {
    [(new Date(2022, 0, 27)).valueOf()]: [
        {
            from: new Time(8, 0),
            to: new Time(12, 0)
        },
        {
            from: new Time(13, 0),
            to: new Time(17, 0)
        }
    ],
    [(new Date(2022, 0, 28)).valueOf()]: [
        {
            from: new Time(8, 0),
            to: new Time(12, 0)
        },
        {
            from: new Time(13, 0),
            to: new Time(17, 10)
        }
    ]
};
