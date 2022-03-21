import Database from "better-sqlite3";
import { app } from "electron";

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
}
