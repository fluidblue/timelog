import { Time } from "../Time";

export interface AddTimeDataJson {
    date: Date;

    from: number;
    to: number;
}

export interface AddTimeDataResult {
    date: Date;

    from: Time;
    to: Time;

    addAnotherEntry: boolean;
}
