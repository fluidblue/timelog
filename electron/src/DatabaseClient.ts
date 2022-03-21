import Database from "better-sqlite3";
import { app } from "electron";
import { Settings, settingsDataDefault, TimeLogDataIn, TimeLogDataOut } from "./api";

export default class DatabaseClient {
    constructor(file: string) {
        const options = {
            verbose: app.isPackaged ? null : console.log
        };
        const db = new Database(file, options);
        console.log(db); // TODO: Remove

        // const userId = 0;
        // const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        // console.log(row); // TODO: Remove
    }

    async settingsGet(): Promise<Settings> {
        // TODO
        return settingsDataDefault;
    }

    async settingsSet(settings: Settings): Promise<boolean> {
        // TODO
        return false;
    }

    async timeLogGet(date: string): Promise<TimeLogDataOut[] | null> {
        // TODO
        return null;
    }

    private jsDate2MysqlDate(date: Date): string {
		const pad = (num: number) => ("00" + num).slice(-2);
		return date.getUTCFullYear() + "-" +
			pad(date.getUTCMonth() + 1) + "-" +
			pad(date.getUTCDate());
	}

    async timeLogAdd(timeLogEntry: TimeLogDataIn): Promise<boolean> {
        // TODO
        return false;
    }

    async timeLogRemove(timeLogEntry: TimeLogDataIn): Promise<boolean> {
        // TODO
        return false;
    }
}
