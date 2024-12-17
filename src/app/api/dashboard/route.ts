import { HttpException } from "@/utils/errors";
import {
  EuroSenderOrder,
  getSingleOrderFromEuroSender,
} from "@/utils/euro_sender";
import { getUser } from "@/utils/firebase";
import { OrderQueryBuilder } from "@/utils/order_query";
import { RevolutOrderData, getRevolutPayment } from "@/utils/revolut";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const query = getQueryParams(req);
    const user = await getUser(req);
    const orderQueryBuilder = new OrderQueryBuilder();
    const orderCountQueryBuilder = new OrderQueryBuilder();

    const orders = await prisma.userOrder.findMany({
      where: {
        ...(query.startDate &&
          query?.endDate && {
            created_at: {
              lte: new Date(query.endDate),
              gte: new Date(query.startDate),
            },
          }),
        ...(user.isAdmin &&
          query.customerEmail && {
            email: query.customerEmail,
          }),
        ...(query.revolutOrderid && {
          revolut_order_id: query.reolutOrderId,
        }),
        ...(!query.isAdmin && {
          email: user.email,
        }),
        ...(query.isCompleted && {
          completed: true,
        }),

        ...(query.isCompleted && {
          completed: false,
        }),
        ...(query.orderCode && {
          order_code: query.orderCode,
        }),
      },
      take: query?.limit ? +query.limit : 10,
      skip: query?.offset ? +query.offset : 0,
    });

    const payments = (
      await Promise.all(
        orders.map(async (o) =>
          o.revolut_order_id
            ? await getRevolutPayment(o.revolut_order_id as string)
            : null,
        ),
      )
    )
      .filter((o) => !!o)
      .reduce(
        (acc, val) => ({ ...acc, [val.id as string]: val }),
        {},
      ) as Record<string, RevolutOrderData>;

    const ordersFromEuroSender = (
      await Promise.all(
        orders.map((o) => getSingleOrderFromEuroSender(o.order_code as string)),
      )
    ).reduce(
      (acc, val) => ({ ...acc, [val.orderCode as string]: val }),
      {},
    ) as Record<string, EuroSenderOrder>;

    const orderDataOutput = orders.map((o: any) => {
      o["payment"] = o.revolut_order_id
        ? payments[o.revolut_order_id as string]
        : null;
      o["euroSenderOrder"] = ordersFromEuroSender[o.order_code!];
      return o;
    });

    return NextResponse.json({
      message: "Successfully got orders data",
      data: {
        totalOrdersWithConditions: await orderQueryBuilder.count(),
        totalOrders: await orderCountQueryBuilder.count(),
        orders: orderDataOutput,
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ ...zodToError(e) });
    }
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    throw e;
  }
}
