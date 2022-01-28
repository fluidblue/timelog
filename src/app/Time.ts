export class Time {
    constructor(public hours: number,
        public minutes: number) {}

    public substract(time: Time): Time {
        const minutesTotalA = this.minutes + this.hours * 60;
        const minutesTotalB = time.minutes + time.hours * 60;

        const resultMinutesTotal = minutesTotalA - minutesTotalB;

        this.hours = Math.floor(resultMinutesTotal / 60);
        this.minutes = resultMinutesTotal % 60;
        return this;
    }
}
