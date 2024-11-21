// @ts-nocheck
import { HttpException } from "@/utils/errors";
import {
  cancelOrderFromEuroSender,
  getSingleOrderFromEuroSender,
} from "@/utils/euro_sender";
import { getUser } from "@/utils/firebase";
import { getRevolutPayment } from "@/utils/revolut";
import { turso } from "@/utils/turso";
import { NextRequest } from "next/server";
import { AxiosError } from "axios";

async function getSingleOrder(uid: string, orderCode: string)
 {
  try {
    const result = await turso.execute({
      sql: `SELECT *  FROM user_orders
            WHERE order_code = ? AND uid = ?`,
      args: [orderCode, uid],
    });
    if (result.rows.length == 0)
      throw new HttpException(`Order doesn't belong to you or not found`, 403);
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

export async function GET(
  req: NextRequest,
  { params }: { params: { orderCode: string } },
) {
  try {
    const orderCode = params.orderCode;
    const user = await getUser(req);
    if (!orderCode)
      return Response.json({
        message: "Invalid data - orderCode is required",
      });
    const { order, result } = await getSingleOrder(user.uid, orderCode);
    const revolutPayment = await getRevolutPayment(
      result["rows"][0]["revolut_order_id"],
    );
    return Response.json({
      message: "Order fetched succesfully",
      details: {
        ...order,
        revolutPayment,
      },
    });
  } catch (e) {
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    throw e;
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { orderCode: string } },
) {
  try {
    const orderCode = params.orderCode;
    const user = await getUser(req);
    if (!user.isAdmin)
      return Response.json(
        {
          message: "You are not an admin",
        },
        403,
      );
    if (!orderCode)
      return Response.json({
        message: "Invalid data - orderCode is required",
      });
    const { order, result } = await getSingleOrder(user.uid, orderCode);
    const deleted = await cancelOrderFromEuroSender(orderCode);

    if (!deleted)
      return Response.json(
        {
          message: "Order deletion failed",
        },
        500,
      );

    return Response.json({
      message: "Order cancelled succesfully",
      details: {
        ...order,
      },
    });
  } catch (e) {
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    if (e instanceof AxiosError){
       const err =new HttpException("Order validation error", 400, {
        cargoSenderHttpStatus: e?.response?.status,
        cargoSenderError: e?.response?.data,
      });
      return err.getHttpResponse();
    }

    throw e;
  }
}
export async function HEAD(request: Request) {}
