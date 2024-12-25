import { prisma } from './prisma';

export const WEBHOOK_ORDER_NOT_FOUND = `WEBHOOK_ORDER_NOT_FOUND`;

export const insertLog = async (text: string) => {
  await prisma.systemLog.create({
    data: {
      body: text,
    },
  });
};
