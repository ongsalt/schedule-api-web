/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `classId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `forRoom` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forYear` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Class";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Test";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forYear" INTEGER NOT NULL,
    "forRoom" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "room" TEXT,
    CONSTRAINT "Schedule_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("day", "id", "period", "room", "subjectId") SELECT "day", "id", "period", "room", "subjectId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "tags" TEXT NOT NULL
);
INSERT INTO "new_Subject" ("code", "id", "link", "name") SELECT "code", "id", "link", "name" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
