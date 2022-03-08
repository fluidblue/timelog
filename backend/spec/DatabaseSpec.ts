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
		const timeLogEntry: TimeLogData = {
			date: new Date(),
			from: 480,
			to: 960
		};
		const result: boolean = await database.timeLogAdd(timeLogEntry)
		expect(result).toBeTrue();
	});
});
