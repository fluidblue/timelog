import { StandardWorkingTimes } from "./Settings";
import { Time } from "./Time";
import { WorkingTime } from "./WorkingTime";

export default class TimeFunctions {

    static getListOfDays(from: Date, to: Date): Date[] {
        const result = [];
        const date = new Date(from);

        function isDateLessThanOrEqual(a: Date, b: Date) {
            return new Date(a.getFullYear(), a.getMonth(), a.getDate()) <= new Date(b.getFullYear(), b.getMonth(), b.getDate());
        }

        while (isDateLessThanOrEqual(date, to)) {
            result.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return result;
    }

    static getTimeDifference(from: Time, to: Time): Time {
        return to.substract(from);
    }

    static getTotalTime(workingTimes: WorkingTime[] | undefined): Time {
        if (!workingTimes || workingTimes.length === 0) {
            return new Time(0, 0);
        }

        const durations = workingTimes.map((workingTime) => this.getTimeDifference(workingTime.from, workingTime.to));
        const totalTime = durations.reduce((previousValue, currentValue) => previousValue.add(currentValue));
        return totalTime;
    }

    static getUnderOverTime(date: Date, standardWorkingTimes: StandardWorkingTimes, totalWorkingTime: Time): Time {
        return this.getTimeDifference(standardWorkingTimes[date.getDay()], totalWorkingTime);
    }
}
