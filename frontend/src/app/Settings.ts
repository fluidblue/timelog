export interface Settings {
    startOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
}

export const DEFAULT_SETTINGS: Settings = {
    startOfWeek: "Monday"
};
