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

export async function GET(req: NextRequest) {
  try {
    const query = getQueryParams(req);
    const user = await getUser(req);
    const orderQueryBuilder = new OrderQueryBuilder();
    const orderCountQueryBuilder = new OrderQueryBuilder();

    if (query?.startDate && query?.endDate) {
      orderQueryBuilder.betweenDate(query.startDate, query.endDate);
    } else if (query?.startDate) {
      orderQueryBuilder.betweenDate(
        query.startDate,
        new Date(3000, 1, 1).toISOString(),
      );
    } else if (query?.endDate) {
      orderQueryBuilder.betweenDate(
        new Date(3000, 1, 1).toISOString(),
        query.endDate,
      );
    }

    if (user.isAdmin && query.customerEmail) {
      orderQueryBuilder.findByEmail(query.customerEmail);
    }

    if (!user.isAdmin) {
      orderQueryBuilder.findByEmail(user.email);
      orderCountQueryBuilder.findByEmail(user.email);
    }

    if (query.revolutOrderId) {
      orderQueryBuilder.findByRevolutOrderId(query.revolutOrderId);
    }

    if (query.isCompleted) {
      orderQueryBuilder.isCompleted();
    }

    if (query.isNotCompleted) {
      orderQueryBuilder.isNotCompleted();
    }

    if (query.orderCode) {
      orderQueryBuilder.findOrderByCode(query.orderCode);
    }

    if (query.limit) {
      orderQueryBuilder.limit(+query.limit);
    }

    if (query.offset) {
      orderQueryBuilder.offset(+query.offset);
    }

    const ob = await orderQueryBuilder.query();
    const orderRows = ob.rows as unknown as {
      payment: RevolutOrderData;
      euroSenderOrder: EuroSenderOrder;
      revolut_order_id: string;
      order_code: string;
    }[];

    const payments = (
      await Promise.all(
        orderRows.map((o) => getRevolutPayment(o.revolut_order_id as string)),
      )
    ).reduce((acc, val) => ({ ...acc, [val.id as string]: val }), {}) as Record<
      string,
      RevolutOrderData
    >;

    const orders = (
      await Promise.all(
        orderRows.map((o) =>
          getSingleOrderFromEuroSender(o.order_code as string),
        ),
      )
    ).reduce(
      (acc, val) => ({ ...acc, [val.orderCode as string]: val }),
      {},
    ) as Record<string, EuroSenderOrder>;

    const orderDataOutput = orderRows.map((o) => {
      o["payment"] = payments[o.revolut_order_id as string];
      o["euroSenderOrder"] = orders[o.order_code as string];
      return o;
    });

    return Response.json({
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
