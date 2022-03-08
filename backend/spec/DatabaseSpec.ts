import "jasmine";

import Database from "../src/Database/Database"
import { SettingsData } from "../src/Database/SettingsData";

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
		const settingsData: SettingsData = {
			weekStartsOn: 'monday',
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
		const result: boolean = await database.settingsPut(settingsData);
		expect(result).toBeTrue();
	});
});
