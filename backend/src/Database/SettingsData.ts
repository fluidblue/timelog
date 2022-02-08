export interface WorkingTimes {
	[key: string]: number
}

export interface SettingsData {
	weekStartsOn: string;
	workingTimes: WorkingTimes;
}

export const settingsDataDefault: SettingsData = {
	weekStartsOn: "monday",
	workingTimes: {
		"monday": 480,
		"tuesday": 480,
		"wednesday": 480,
		"thursday": 480,
		"friday": 480,
		"saturday": 0,
		"sunday": 0
	}
};
