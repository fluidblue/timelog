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
            verbose: app.isPackaged ? null : console.log
        };
        this.db = new Database(file, options);
        console.log(this.db); // TODO: Remove

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
        Log.info("Executing settingsGet")
        return settingsDataDefault;
    }

    settingsSet(settings: Settings): boolean {
        // TODO
        console.log("settingsSet:", settings);
        return false;
    }

    timeLogGet(date: string): TimeLogDataOut[] | null {
        // TODO
        console.log("timeLogGet:", date);
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
        console.log("timeLogAdd:", timeLogEntry);
        return false;
    }

    timeLogRemove(timeLogEntry: TimeLogDataIn): boolean {
        // TODO
        console.log("timeLogRemove:", timeLogEntry);
        return false;
    }
}
