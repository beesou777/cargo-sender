import { Client } from "@libsql/client";
import { prisma } from "./prisma";
import { PrismaClient } from "@prisma/client";

export class OrderQueryBuilder {
  uid?: string;
  email?: string;
  order_code?: string;
  created_at_between?: [string, string];
  completed?: boolean;
  revolut_id?: string;

  limitValue: number = 10;
  offsetValue: number = 0;

  prisma: PrismaClient = prisma;

  async query() {
    return this.prisma.userOrder.findMany({
      where: {
        ...(this.uid && { uid: this.uid }),
        ...(this.order_code && { order_code: this.order_code }),
        ...(this.email && { email: this.email }),
        ...(this.revolut_id && { revolut_order_id: this.revolut_id }),
        ...(this.completed === false && { completed: false }),
        ...(this.completed === true && { completed: true }),
      },
      take: this.limitValue,
      skip: this.offsetValue,
    });
  }

  async count(): Promise<number> {
    return this.prisma.userOrder.count({
      where: {
        ...(this.uid && { uid: this.uid }),
        ...(this.order_code && { order_code: this.order_code }),
        ...(this.email && { email: this.email }),
        ...(this.revolut_id && { revolut_order_id: this.revolut_id }),
        ...(this.completed === false && { completed: false }),
        ...(this.completed === true && { completed: true }),
      },
    });
  }
}
