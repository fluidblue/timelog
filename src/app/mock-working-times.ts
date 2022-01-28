import { WorkingTime } from "./WorkingTime";

export interface WorkingTimes {
    [key: number]: WorkingTime[]
}

export const WORKING_TIMES: WorkingTimes = {
    [(new Date(2022, 0, 27)).valueOf()]: [
        {
            from: { hours: 8, minutes: 0 },
            to: { hours: 12, minutes: 0 }
        },
        {
            from: { hours: 13, minutes: 0 },
            to: { hours: 17, minutes: 0 }
        }
    ],
    [(new Date(2022, 0, 28)).valueOf()]: [
        {
            from: { hours: 8, minutes: 0 },
            to: { hours: 12, minutes: 0 }
        },
        {
            from: { hours: 13, minutes: 0 },
            to: { hours: 17, minutes: 10 }
        }
    ]
};
