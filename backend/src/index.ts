#!/usr/bin/env node

/*!
 * ==================================================================
 * 
 * timelog
 * 
 * Created by Max Geissler
 * License: See LICENSE.md in the root directory of this repository.
 * 
 * ==================================================================
 */
 
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import wrap from "./wrap";

import Database from "./Database/Database";
import Log from "./Log/Log";

const app = express();

const port = process.env.PORT || 9000;
const httpdocs = "httpdocs";
const indexRewrites = [
	"/underovertime",
	"/settings"
];

async function main() {
	// Connect to database
	const database: Database = new Database();

	// Parse application/json and application/x-www-form-urlencoded in POST requests.
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Basic logging
	app.use(wrap(async function (req, res, next) {
		Log.info(req.method + " " + req.url);
		next();
	}));

	// Allow all cross origin requests (controlled by CORS).
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	app.use(cors());

	// Serve static files
	app.use("/", express.static(path.join(__dirname, httpdocs)));

	// Rewrites to index.html
	app.use(indexRewrites, wrap(async (req, res, next) => {
		const indexFile = path.join(__dirname, httpdocs, "index.html");

		// Check if file exists
		fs.stat(indexFile, (err, stats) => {
			if (err) {
				// File does not exist or is not accessible
				next();
				return;
			}

			// Send file
			res.sendFile(indexFile);
		});
	}));

	/**
	 * In the following, the REST API is defined.
	 */

	// TODO

	app.listen(port, () => {
		console.log(`timelog listening at http://localhost:${port}`);
	});
}

main();
