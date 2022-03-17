import * as sqlite3 from "sqlite3";
import * as sqlite from "sqlite";

import { app } from "electron";
import * as path from "path";

export default class Database {
    private db: sqlite.Database<sqlite3.Database, sqlite3.Statement> | null = null;

    constructor() {
        sqlite.open({
            filename: path.join(app.getPath("appData"), "db.sqlite3"),
            driver: sqlite3.Database
        }).then((db) => {
            this.db = db;
        });
    }
}
