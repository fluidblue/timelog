import "jasmine";

import Database from "../src/Database/Database"
import { SettingsData } from "../src/Database/SettingsData";

describe("Database", () => {
	let database: Database;

	beforeEach(() => {
		database = new Database();
	});

	it("should get and put the settings", async () => {
		const settingsData: SettingsData = await database.settingsGet();

		// TODO
		console.log(settingsData);
	});
});
