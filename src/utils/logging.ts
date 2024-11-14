import { turso } from "./turso";

export const WEBHOOK_ORDER_NOT_FOUND = `WEBHOOK_ORDER_NOT_FOUND`;

export const insertLog = async (text: string) => {
  await turso.execute({
    sql: `
        INSERT INTO system_logs(text)
        VALUES (?)
        `,
    args: [text],
  });
};
