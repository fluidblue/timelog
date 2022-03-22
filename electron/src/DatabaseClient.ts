import Database from "better-sqlite3";
import { app } from "electron";
import { Settings, settingsDataDefault, TimeLogDataIn, TimeLogDataOut, WorkingTimes } from "./api";
import Log from "./Log";
import * as fs from 'fs';
import * as path from "path";

export default class DatabaseClient {
    private db;

    constructor(file: string) {
        const options = {
            verbose: app.isPackaged ? null : Log.info
        };
        this.db = new Database(file, options);
        Log.info("Opened database: " + (this.db ? this.db.name : this.db));

        // const userId = 0;
        // const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        // console.log(row); // TODO: Remove
    }

    createNewDatabase() {
        Log.info("Creating new database");

        const dbStructure = fs.readFileSync(path.join(__dirname, "../db.sql"), "utf8");
        this.db.exec(dbStructure);
    }

    close() {
        this.db.close();
    }

    settingsGet(): Settings {
        Log.info("Executing settingsGet");

        // Note: JSON.parse(JSON.stringify(...)) is not efficient, but does the job (of deep cloning).
		const settingsData: Settings = JSON.parse(JSON.stringify(settingsDataDefault));

        let statement = this.db.prepare("SELECT * FROM `WorkingTimes` ORDER BY `id` ASC");
        const rows = statement.all();
        for (let i = 0; i < rows.length; i++) {
            const name: keyof WorkingTimes = rows[i].name;
            const workingTime: number = rows[i].workingTime;
            settingsData.workingTimes[name] = workingTime;
        }

        statement = this.db.prepare("SELECT * FROM `Settings`");
        const row = statement.get();
        if (row) {
            const settings = row;
            settingsData.weekStartsOn = settings.weekStartsOn;
        }

        return settingsData;
    }

    settingsSet(settings: Settings): boolean {
        // TODO
        Log.info("Executing settingsSet");
        return false;
    }

    timeLogGet(date: string): TimeLogDataOut[] | null {
        // TODO
        Log.info("Executing timeLogGet");
        return null;
    }

    private jsDate2MysqlDate(date: Date): string {
		const pad = (num: number) => ("00" + num).slice(-2);
		return date.getUTCFullYear() + "-" +
			pad(date.getUTCMonth() + 1) + "-" +
			pad(date.getUTCDate());
	}

    timeLogAdd(timeLogEntry: TimeLogDataIn): boolean {
        // TODO
        Log.info("Executing timeLogAdd");
        return false;
    }

    timeLogRemove(timeLogEntry: TimeLogDataIn): boolean {
        // TODO
        Log.info("Executing timeLogRemove");
        return false;
    }
}
