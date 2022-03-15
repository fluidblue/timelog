import { Time } from "../Time";

export interface AddTimeDataResult {
    date: Date;

    from: Time;
    to: Time;

    addAnotherEntry: boolean;
}
