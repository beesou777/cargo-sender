import { HttpException } from "@/utils/errors";
import { getSingleOrderFromEuroSender } from "@/utils/euro_sender";
import { getUser } from "@/utils/firebase";
import { getRevolutPayment } from "@/utils/revolut";
import { turso } from "@/utils/turso";
import { zodToError } from "@/utils/zod_error_handler";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

async function getSingleOrder(orderCode: string) {
  try {
    const result = await turso.execute({
      sql: `SELECT *  FROM user_orders
            WHERE order_code = ?`,
      args: [orderCode],
    });
    if (result.rows.length == 0)
      throw new HttpException(`Order doesn't exist`, 404);
    const singleOrder = await getSingleOrderFromEuroSender(orderCode);
    return {
      order: singleOrder,
      result,
    };
  } catch (e: any) {
    if (!(e instanceof HttpException))
      throw new HttpException(e.message, 500, { original: e.toString() });
    throw e;
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { orderCode: string } },
) {
  try {
    const orderCode = params.orderCode;
    const user = await getUser(req);
    if (!orderCode) throw new HttpException(`Order code is required`, 400);
    if (!user.isAdmin) throw new HttpException("You are not admin", 403);
    const { order, result } = await getSingleOrder(orderCode);
    const revolutPayment = await getRevolutPayment(
      result["rows"][0]["revolut_order_id"] as string,
    );
    const euroSenderOrder = await getSingleOrderFromEuroSender(orderCode);
    await turso.execute({
      sql: `UPDATE user_orders SET completed = 1 WHERE order_code = ?`,
      args: [orderCode],
    });
    return NextResponse.json({
      message: "Order is marked as completed",
      data: {
        ...order,
        revolutPayment,
        euroSenderOrder,
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
