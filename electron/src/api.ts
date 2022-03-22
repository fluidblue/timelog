export interface WorkingTimes {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
}

export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Settings {
    weekStartsOn: WeekDay;
    workingTimes: WorkingTimes;
}

export const settingsDataDefault: Settings = {
    weekStartsOn: "monday",
    workingTimes: {
        monday: 480,
        tuesday: 480,
        wednesday: 480,
        thursday: 480,
        friday: 480,
        saturday: 0,
        sunday: 0
    }
};

export interface TimeLogDataIn {
    date: Date;
    from: number;
    to: number;
}

export interface TimeLogDataOut {
    from: number;
    to: number;
}

export interface TimelogAPI {
    settingsGet: () => Promise<Settings>;
    settingsSet: (settings: Settings) => Promise<boolean>;
    timeLogGet: (date: Date) => Promise<TimeLogDataOut[] | null>;
    timeLogAdd: (timeLogEntry: TimeLogDataIn) => Promise<boolean>;
    timeLogRemove: (timeLogEntry: TimeLogDataIn) => Promise<boolean>;
}
