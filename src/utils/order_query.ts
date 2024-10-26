import { Client } from "@libsql/client";
import { turso } from "./turso";

export class OrderQueryBuilder {
  uid?: string;
  email?: string;
  order_code?: string;
  created_at_between?: [string, string];
  completed?: boolean;

  turso: Client;

  filters: string[] = [];
  args: string[] = [];

  limitValue: number = 10;
  offsetValue: number = 0;

  constructor() {
    this.turso = turso;
  }

  findOrderByUid(uid: string) {
    this.filters.push("uid = ?");
    this.args.push(uid);
    return this;
  }

  findByEmail(email: string) {
    this.filters.push("email = ?");
    this.args.push(email);
    return this;
  }

  findOrderByCode(orderCode: string) {
    this.filters.push("order_code = ?");
    this.args.push(orderCode);
    return this;
  }

  findByRevolutOrderId(revolutOrderId: string) {
    this.filters.push("revolut_order_id = ?");
    this.args.push(revolutOrderId);
    return this;
  }

  isCompleted() {
    this.filters.push("completed = ?");
    this.args.push(`1`);
    return this;
  }

  isNotCompleted() {
    this.filters.push("completed = ?");
    this.args.push(`0`);
    return this;
  }

  betweenDate(startDate: string, endDate: string) {
    this.filters.push("created_at BETWEEN ? AND ?");
    this.args.push(startDate);
    this.args.push(endDate);
    return this;
  }

  limit(limit: number) {
    this.limitValue = limit;
    return this;
  }

  offset(offset: number) {
    this.offsetValue = offset;
    return this;
  }

  async query() {
    const hasFilters = this.filters.length > 0 && this.args.length > 0;
    const filters = hasFilters ? `${this.filters.join(" AND ")}` : ``;
    const sql = `SELECT * FROM user_orders ${hasFilters ? `WHERE ${filters}` : ""} LIMIT 10`;
    const rs = await this.turso.execute({
      sql,
      args: this.args,
    });
    return rs;
  }

  async count(): Promise<number> {
    const hasFilters = this.filters.length > 0 && this.args.length > 0;
    const filters = hasFilters ? `${this.filters.join(" AND ")}` : ``;
    const sql = `SELECT COUNT(*) AS count FROM user_orders ${hasFilters ? `WHERE ${filters}` : ""} LIMIT ${this.limitValue} OFFSET ${this.offsetValue}`;
    const rs = await this.turso.execute({
      sql,
      args: this.args,
    });
    const count = rs.rows[0]["count"] as number;
    return count;
  }
}
