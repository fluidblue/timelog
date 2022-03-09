import { Time } from "./Time";

export interface WorkingTimeJson {
    from: number;
    to: number;
}

export interface WorkingTime {
    from: Time;
    to: Time;
}
