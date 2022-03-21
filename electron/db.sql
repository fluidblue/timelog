-- Adminer 4.8.1 SQLite 3 3.36.0 dump

DROP TABLE IF EXISTS "Settings";
CREATE TABLE "Settings" (
  "weekStartsOn" text NOT NULL
);

INSERT INTO "Settings" ("weekStartsOn") VALUES ('monday');

DROP TABLE IF EXISTS "TimeLog";
CREATE TABLE "TimeLog" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "date" integer NOT NULL,
  "from" integer NOT NULL,
  "to" integer NOT NULL
);


DROP TABLE IF EXISTS "WorkingTimes";
CREATE TABLE "WorkingTimes" (
  "id" integer NOT NULL,
  "name" text NOT NULL,
  "workingTime" integer NOT NULL,
  PRIMARY KEY ("id")
);

INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (0,	'sunday',	0);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (1,	'monday',	480);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (2,	'tuesday',	480);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (3,	'wednesday',	480);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (4,	'thursday',	480);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (5,	'friday',	480);
INSERT INTO "WorkingTimes" ("id", "name", "workingTime") VALUES (6,	'saturday',	0);
