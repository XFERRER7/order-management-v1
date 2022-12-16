-- CreateTable
CREATE TABLE "Apartament" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "apartamentNumber" INTEGER NOT NULL,
    CONSTRAINT "Order_apartamentNumber_fkey" FOREIGN KEY ("apartamentNumber") REFERENCES "Apartament" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "apartamentNumber" INTEGER NOT NULL,
    CONSTRAINT "User_apartamentNumber_fkey" FOREIGN KEY ("apartamentNumber") REFERENCES "Apartament" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("apartamentNumber", "email", "id", "name", "password") SELECT "apartamentNumber", "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_apartamentNumber_key" ON "User"("apartamentNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Apartament_number_key" ON "Apartament"("number");
