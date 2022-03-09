export type StartOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Settings {
    startOfWeek: StartOfWeek
}

export const DEFAULT_SETTINGS: Settings = {
    startOfWeek: "monday"
};
