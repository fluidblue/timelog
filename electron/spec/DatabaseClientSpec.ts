import "jasmine";

import os from 'os';
import path from 'path';
import UUID from 'pure-uuid';

import DatabaseClient from "../src/DatabaseClient"
import { Settings, settingsDataDefault, TimeLogDataOut } from "../src/api";
import { TimeLogDataIn } from "../src/api";

describe("Database", () => {
	let database: DatabaseClient;

	beforeEach(() => {
		const uuid = new UUID(4).format();
		const dbFile = path.join(os.tmpdir(), uuid + ".sqlite3");

		database = new DatabaseClient(dbFile, true);
		database.createNewDatabase();
	});

	it("should get the settings", async () => {
		const settingsData: Settings = database.settingsGet();

		expect(settingsData.weekStartsOn).toBeDefined();
		expect(settingsData.workingTimes["monday"]).toBeDefined();
		expect(settingsData.workingTimes["tuesday"]).toBeDefined();
		expect(settingsData.workingTimes["wednesday"]).toBeDefined();
		expect(settingsData.workingTimes["thursday"]).toBeDefined();
		expect(settingsData.workingTimes["friday"]).toBeDefined();
		expect(settingsData.workingTimes["saturday"]).toBeDefined();
		expect(settingsData.workingTimes["sunday"]).toBeDefined();
	});

	it("should set the settings", async () => {
		const settingsData: Settings = settingsDataDefault;
		const result: boolean = database.settingsSet(settingsData);
		expect(result).toBeTrue();
	});

	it("should add a TimeLogData entry", async () => {
		const timeLogEntry: TimeLogDataIn = {
			date: "2022-03-22",
			from: 480,
			to: 720
		};
		const result: boolean = database.timeLogAdd(timeLogEntry)
		expect(result).toBeTrue();
	});

	it("should put and get TimeLogData entries", async () => {
		const date = "2022-03-22";

		// Put a TimeLogData entry
		const timeLogEntry: TimeLogDataIn = {
			date: date,
			from: 780,
			to: 1020
		};
		const result: boolean = database.timeLogAdd(timeLogEntry)
		expect(result).toBeTrue();

		// Get TimeLogData entries
		const timeLogEntries: TimeLogDataOut[] = database.timeLogGet(date);

		expect(timeLogEntries).toBeDefined();
		expect(timeLogEntries.length).toBeGreaterThanOrEqual(1);
		
		const lastItem = timeLogEntries[timeLogEntries.length - 1];
		expect(lastItem.from).toEqual(timeLogEntry.from);
		expect(lastItem.to).toEqual(timeLogEntry.to);
	});
});
