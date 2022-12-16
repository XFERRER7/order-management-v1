/*
  Warnings:

  - You are about to drop the `Apartament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `apartamentNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apartamentNumber` on the `Order` table. All the data in the column will be lost.
  - Added the required column `apartmentNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Apartament_number_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Apartament";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Apartment" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "apartmentNumber" INTEGER NOT NULL,
    CONSTRAINT "User_apartmentNumber_fkey" FOREIGN KEY ("apartmentNumber") REFERENCES "Apartment" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_apartmentNumber_key" ON "User"("apartmentNumber");
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "apartmentNumber" INTEGER NOT NULL,
    CONSTRAINT "Order_apartmentNumber_fkey" FOREIGN KEY ("apartmentNumber") REFERENCES "Apartment" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "status", "updatedAt") SELECT "createdAt", "id", "status", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_number_key" ON "Apartment"("number");
