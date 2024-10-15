import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

turso.executeMultiple(
  `
    CREATE TABLE IF NOT EXISTS user_orders(
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL,
        status VARCHAR(250) NOT NULL,
        name VARCHAR(250) NOT NULL,
        order_code VARCHAR(250),
        completed BOOL DEFAULT FALSE,
        labels_ready BOOL DEFAULT FALSE,
        tracking_url VARCHAR(250),
        courier_id VARCHAR(250),
        tracking_code VARCHAR(250),
        latest_webhook_event VARCHAR(250)
    );

    CREATE TABLE IF NOT EXISTS system_logs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        body TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    );
`,
);
