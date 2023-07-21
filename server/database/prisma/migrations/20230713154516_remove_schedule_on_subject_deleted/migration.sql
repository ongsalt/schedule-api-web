-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "forYear" INTEGER NOT NULL,
    "forRoom" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "room" TEXT,

    PRIMARY KEY ("forYear", "forRoom", "day", "period"),
    CONSTRAINT "Schedule_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("day", "forRoom", "forYear", "period", "room", "subjectId") SELECT "day", "forRoom", "forYear", "period", "room", "subjectId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
