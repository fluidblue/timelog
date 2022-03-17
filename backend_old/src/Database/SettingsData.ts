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

export interface SettingsData {
	weekStartsOn: WeekDay;
	workingTimes: WorkingTimes;
}

export const settingsDataDefault: SettingsData = {
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
