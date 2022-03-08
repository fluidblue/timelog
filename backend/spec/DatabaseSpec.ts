import "jasmine";

import Database from "../src/Database/Database"
import { SettingsData, settingsDataDefault } from "../src/Database/SettingsData";
import { TimeLogData } from "../src/Database/TimeLogData";

describe("Database", () => {
	let database: Database;

	beforeEach(() => {
		database = new Database();
	});

	it("should get the settings", async () => {
		const settingsData: SettingsData = await database.settingsGet();

		expect(settingsData.weekStartsOn).toBeDefined();
		expect(settingsData.workingTimes["monday"]).toBeDefined();
		expect(settingsData.workingTimes["tuesday"]).toBeDefined();
		expect(settingsData.workingTimes["wednesday"]).toBeDefined();
		expect(settingsData.workingTimes["thursday"]).toBeDefined();
		expect(settingsData.workingTimes["friday"]).toBeDefined();
		expect(settingsData.workingTimes["saturday"]).toBeDefined();
		expect(settingsData.workingTimes["sunday"]).toBeDefined();
	});

	it("should get and put the settings", async () => {
		const settingsData: SettingsData = settingsDataDefault;
		const result: boolean = await database.settingsPut(settingsData);
		expect(result).toBeTrue();
	});

	it("should add a TimeLogData entry", async () => {
		const now = new Date();
		const timeLogEntry: TimeLogData = {
			date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			from: 480,
			to: 720
		};
		const result: boolean = await database.timeLogAdd(timeLogEntry)
		expect(result).toBeTrue();
	});

	it("should put and get TimeLogData entries", async () => {
		// Put a TimeLogData entry
		const now = new Date();
		const timeLogEntry: TimeLogData = {
			date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			from: 780,
			to: 1020
		};
		const result: boolean = await database.timeLogAdd(timeLogEntry)
		expect(result).toBeTrue();

		// Get TimeLogData entries
		const timeLogEntries: TimeLogData[] = await database.timeLogGet();

		expect(timeLogEntries).toBeDefined();
		expect(timeLogEntries.length).toBeGreaterThanOrEqual(1);
		
		const lastItem = timeLogEntries[timeLogEntries.length - 1];
		expect(lastItem.date).toEqual(timeLogEntry.date);
		expect(lastItem.from).toEqual(timeLogEntry.from);
		expect(lastItem.to).toEqual(timeLogEntry.to);
	});
});
