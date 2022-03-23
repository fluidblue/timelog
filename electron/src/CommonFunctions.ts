export default class CommonFunctions {
    static convertStringToDate(dateString: string): Date | null {
        try {
            const dateParts = dateString.split("-");

            const year = parseInt(dateParts[0]);
            const monthIndex = parseInt(dateParts[1]) - 1;
            const day = parseInt(dateParts[2]);
            if (isNaN(year) || isNaN(monthIndex) || isNaN(day)) {
                return null;
            }

            return new Date(year, monthIndex, day, 0, 0, 0, 0);
        } catch (err) {
            return null;
        }
    }

    static convertDateToString(date: Date): string {
        const pad = (num: number) => ("00" + num).slice(-2);
        return date.getFullYear() + "-" +
            pad(date.getMonth() + 1) + "-" +
            pad(date.getDate());
    }

    static convertStringToTimestamp(dateString: string): number | null {
        const date = CommonFunctions.convertStringToDate(dateString);
        if (!date) {
            return null;
        }
        return date.getTime();
    }

    static convertTimestampToString(timestamp: number): string {
        const date = new Date();
        date.setTime(timestamp);
        return CommonFunctions.convertDateToString(date);
    }
}
