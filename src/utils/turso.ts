import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

turso.executeMultiple(`
    CREATE TABLE IF NOT EXISTS user_orders(
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL,
        name VARCHAR(250) NOT NULL,
        order_code VARCHAR(250),
        completed BOOL DEFAULT FALSE,
        revolut_order_id TEXT
    );
`);
