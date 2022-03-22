import Database from "better-sqlite3";
import { app } from "electron";
import { Settings, settingsDataDefault, TimeLogDataIn, TimeLogDataOut } from "./api";
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
        // TODO
        Log.info("Executing settingsGet");
        return settingsDataDefault;
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
