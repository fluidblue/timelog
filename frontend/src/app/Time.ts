export class Time {
    private minutesTotal: number;

    private static reTime = /^(?<hours>[0-9]{1,2}):(?<minutes>[0-9]{2})$/;

    constructor(hours: number, minutes: number) {
        this.minutesTotal = minutes + hours * 60;
    }

    public static fromMinutes(minutes: number): Time {
        return new Time(0, minutes);
    }

    public static fromString(time: string, disallowNegativeTime: boolean = false): Time | null {
        let negativeTime = false;
        if (time.startsWith("-")) {
            time = time.substring(1);
            negativeTime = true;
        }
        if (negativeTime && disallowNegativeTime) {
            return null;
        }

        const matchResult = time.match(Time.reTime);
        if (!matchResult) {
            return null;
        }
        const hours: number = parseInt(matchResult.groups!["hours"]);
        const minutes: number = parseInt(matchResult.groups!["minutes"]);
        if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60) {
            return null;
        }
        const timeObject = new Time(hours, minutes);

        if (negativeTime) {
            timeObject.multiply(-1);
        }

        return timeObject;
    }

    public toString(fullHours: boolean = false, showPlus = false): string {
        let result = ""
        if (this.isNegativeTime()) {
            result = "-"
        } else if (showPlus) {
            result = "+"
        }

        let hours = this.getHours().toString();
        if (fullHours && hours.length <= 1) {
            hours = "0" + hours
        }

        let minutes = this.getMinutes().toString();
        if (minutes.length <= 1) {
            minutes = "0" + minutes
        }

        result += hours + ":" + minutes;
        return result;
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
        return Math.abs(this.minutesTotal) % 60;
    }

    public getTotalMinutes(): number {
        return this.minutesTotal;
    }

    public getHours(): number {
        return Math.floor(Math.abs(this.minutesTotal) / 60);
    }

    public isNegativeTime(): boolean {
        return this.minutesTotal < 0;
    }
}
