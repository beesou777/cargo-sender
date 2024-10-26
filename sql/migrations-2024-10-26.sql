CREATE TABLE IF NOT EXISTS user_orders(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    name VARCHAR(250) NOT NULL,
    order_code VARCHAR(250),
    completed BOOL DEFAULT FALSE,
    revolut_order_id TEXT,

    created_at TEXT DEFAULT (datetime('now'))
);


CREATE TABLE cargo_sender_admins(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(250) NOT NULL
);
