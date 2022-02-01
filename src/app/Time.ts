export class Time {
    private minutesTotal: number;

    constructor(hours: number, minutes: number) {
        this.minutesTotal = minutes + hours * 60;
    }

    public substract(time: Time): Time {
        const result = new Time(0, 0);
        result.minutesTotal = this.minutesTotal - time.minutesTotal;
        return result;
    }

    public add(time: Time): Time {
        const result = new Time(0, 0);
        result.minutesTotal = this.minutesTotal + time.minutesTotal;
        return result;
    }

    public multiply(factor: number): Time {
        const result = new Time(0, 0);
        result.minutesTotal = this.minutesTotal * factor;
        return result;
    }

    public getMinutes(): number {
        return Math.abs(this.minutesTotal % 60);
    }

    public getHours(): number {
        return Math.abs(Math.floor(this.minutesTotal / 60));
    }

    public isNegativeTime(): boolean {
        return this.minutesTotal < 0;
    }
}
