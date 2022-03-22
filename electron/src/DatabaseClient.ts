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

        try {
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
        } catch (err) {
            Log.error(err);
            return settingsDataDefault;
        }

        return settingsData;
    }

    settingsSet(settings: Settings): boolean {
        Log.info("Executing settingsSet");

        try {
            let day: keyof WorkingTimes;
            for (day in settings.workingTimes) {
                const workingTime = settings.workingTimes[day];

                const statement = this.db.prepare("UPDATE `WorkingTimes` SET `workingTime` = ? WHERE `name` = ?");
                const result = statement.run(workingTime, day);
                if (result.changes !== 1) {
                    return false;
                }
            }

            let statement = this.db.prepare("DELETE FROM `Settings`");
            let result = statement.run();
            if (result.changes < 1) {
                return false;
            }

            statement = this.db.prepare("INSERT INTO `Settings` (`weekStartsOn`) VALUES (?)");
            result = statement.run(settings.weekStartsOn);
            if (result.changes !== 1) {
                return false;
            }
        } catch (err) {
            Log.error(err);
            return false;
        }

        return true;
    }

    timeLogGet(date: Date): TimeLogDataOut[] | null {
        Log.info("Executing timeLogGet");

        try {
            const statement = this.db.prepare("SELECT `from`, `to` FROM `TimeLog` WHERE `date` = ? ORDER BY `from` ASC");
            const rows = statement.all(date.getTime());
            return rows.map(
                (row) => {
                    return {
                        from: row.from,
                        to: row.to
                    }
                }
            );
        } catch (err) {
            Log.error(err);
            return null;
        }
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
