import Database from "better-sqlite3";
import { Settings, settingsDataDefault, TimeLogDataIn, TimeLogDataOut, WorkingTimes } from "./api";
import Log from "./Log";
import fs from "fs";
import path from "path";
import CommonFunctions from "./CommonFunctions";

export default class DatabaseClient {
    private db;

    constructor(file: string, debug: boolean) {
        const options = {
            verbose: debug ? null : Log.info
        };
        this.db = new Database(file, options);
        Log.info("Opened database: " + (this.db ? this.db.name : this.db));
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

    timeLogGet(date: string): TimeLogDataOut[] | null {
        Log.info("Executing timeLogGet");

        try {
            const statement = this.db.prepare("SELECT `from`, `to` FROM `TimeLog` WHERE `date` = ? ORDER BY `from` ASC");
            const rows = statement.all(CommonFunctions.convertStringToTimestamp(date));
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
        Log.info("Executing timeLogAdd");

        try {
            const statement = this.db.prepare("INSERT INTO `TimeLog` (`date`, `from`, `to`) VALUES (?, ?, ?)");
            const result = statement.run(CommonFunctions.convertStringToTimestamp(timeLogEntry.date), timeLogEntry.from, timeLogEntry.to);
            if (result.changes !== 1) {
                return false;
            }
        } catch (err) {
            Log.error(err);
            return false;
        }

        return true;
    }

    timeLogRemove(timeLogEntry: TimeLogDataIn): boolean {
        Log.info("Executing timeLogRemove");

        try {
            const statement = this.db.prepare("DELETE FROM `TimeLog` WHERE (`date` = ? AND `from` = ? AND `to` = ?)");
            const result = statement.run(CommonFunctions.convertStringToTimestamp(timeLogEntry.date), timeLogEntry.from, timeLogEntry.to);
            if (result.changes < 1) {
                return false;
            }
        } catch (err) {
            Log.error(err);
            return false;
        }

        return true;
    }

    timeLogGetFirstRecordDate(): string | null {
        Log.info("Executing timeLogGetFirstRecordDate");

        try {
            let statement = this.db.prepare("SELECT `date` FROM `TimeLog` ORDER BY `date` ASC LIMIT 1");
            const row = statement.get();
            return CommonFunctions.convertTimestampToString(row.date);
        } catch (err) {
            Log.error(err);
            return null;
        }
    }
}
