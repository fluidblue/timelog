export default class TimeFunctions {

    static getListOfDays(from: Date, to: Date) {
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
}
