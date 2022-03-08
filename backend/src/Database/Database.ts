import mariadb from "mariadb";
import fs from "fs";

import Log from "../Log/Log";
import { SettingsData, settingsDataDefault } from "./SettingsData";
import { TimeLogData } from "./TimeLogData";

export default class Database {
	private pool: mariadb.Pool;

	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: this.readPassword(),
			database: process.env.DATABASE_DB,
			connectionLimit: 5
		});
	}

	private readPassword(): string {
		let password = fs.readFileSync(process.env.DATABASE_PASSWORD_FILE!, "utf8");

		// Remove trailing newlines.
		// Some editors (e.g. nano, vim, ...) append newlines to files,
		// even if the user did not enter them.
		password = password.split("\r\n")[0].split("\n")[0];

		return password;
	}

	async settingsGet(): Promise<SettingsData> {
		// Note: JSON.parse(JSON.stringify(...)) is not efficient, but does the job (of deep cloning).
		const settingsData: SettingsData = JSON.parse(JSON.stringify(settingsDataDefault));

		let conn: mariadb.PoolConnection | null = null;
		try {
			conn = await this.pool.getConnection();

			let rows: any[] = await conn.query("SELECT * FROM `WorkingTimes` ORDER BY `id` ASC");
			for (let i = 0; i < rows.length; i++) {
				const name = rows[i].name;
				const workingTime = rows[i].workingTime;
				settingsData.workingTimes[name] = workingTime;
			}

			rows = await conn.query("SELECT * FROM `Settings`");
			if (rows && rows[0]) {
				const settings = rows[0];
				settingsData.weekStartsOn = settings.weekStartsOn;
			}
		} catch (err) {
			Log.error(err);
		} finally {
			if (conn) {
				conn.end();
			}
		}

		return settingsData;
	}

	async settingsPut(settingsData: SettingsData): Promise<boolean> {
		let conn: mariadb.PoolConnection | null = null;
		try {
			conn = await this.pool.getConnection();
			let res: any;

			for (const day in settingsData.workingTimes) {
				const workingTime = settingsData.workingTimes[day];

				res = await conn.query(
					"UPDATE `WorkingTimes` SET `workingTime` = ? WHERE `name` = ?",
					[workingTime, day]
				);
				if (!res || res.warningStatus) {
					return false;
				}
			}

			res = await conn.query("DELETE FROM `Settings`");
			if (res.warningStatus) {
				return false;
			}

			res = await conn.query(
				"INSERT INTO `Settings` (`weekStartsOn`) VALUES (?)",
				[settingsData.weekStartsOn]
			);
			if (!res || res.affectedRows < 1) {
				return false;
			}
		} catch (err) {
			Log.error(err);
			return false;
		} finally {
			if (conn) {
				conn.end();
			}
		}
		return true;
	}

	async timeLogGet(): Promise<TimeLogData[]> {
		const timeLogEntries: TimeLogData[] = [];

		let conn: mariadb.PoolConnection | null = null;
		try {
			conn = await this.pool.getConnection();

			let rows = await conn.query("SELECT `date`, TIME_TO_SEC(`from`) AS `from`, TIME_TO_SEC(`to`) AS `to` FROM `TimeLog`");
			for (const row of rows) {
				timeLogEntries.push({
					date: new Date(row.date),
					from: row.from / 60,
					to: row.to / 60
				});
			}
		} catch (err) {
			Log.error(err);
		} finally {
			if (conn) {
				conn.end();
			}
		}

		return timeLogEntries;
	}

	private jsDate2MySQLDate(date: Date): string {
		const pad = (num: number) => ("00" + num).slice(-2)
		return date.getFullYear() + "-" +
			pad(date.getMonth() + 1) + "-" +
			pad(date.getDate());
	}

	async timeLogAdd(timeLogEntry: TimeLogData): Promise<boolean> {
		let conn: mariadb.PoolConnection | null = null;
		try {
			conn = await this.pool.getConnection();

			const date = this.jsDate2MySQLDate(timeLogEntry.date);
			let res = await conn.query(
				"INSERT INTO `TimeLog` (`date`, `from`, `to`) VALUES (?, SEC_TO_TIME(?), SEC_TO_TIME(?))",
				[date, timeLogEntry.from * 60, timeLogEntry.to * 60]
			);
			if (!res || res.affectedRows < 1) {
				return false;
			}
		} catch (err) {
			Log.error(err);
			return false;
		} finally {
			if (conn) {
				conn.end();
			}
		}
		return true;
	}
}
