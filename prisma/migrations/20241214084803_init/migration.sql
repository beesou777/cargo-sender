-- CreateTable
CREATE TABLE "UserOrder" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT,
    "name" TEXT NOT NULL,
    "order_code" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "labels_ready" INTEGER NOT NULL DEFAULT 0,
    "tracking_url" TEXT,
    "courier_id" TEXT,
    "tracking_code" TEXT,
    "latest_webhook_event" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SystemLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CargoSenderAdmin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);
