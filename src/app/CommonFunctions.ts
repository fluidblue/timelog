import { Time } from "./Time";

export class CommonFunctions {
    static parseDateEvent(event: Event): Date | undefined {
        const value = (event.target as HTMLInputElement).value;
        return CommonFunctions.parseDate(value);
    }

    private static parseDate(dateString?: string): Date | undefined {
        if (!dateString) {
            return undefined;
        }
        return new Date(dateString);
    }

    static parseTimeEvent(event: Event): Time | null {
        const value = (event.target as HTMLInputElement).value;
        return Time.fromString(value, true);
    }
}
