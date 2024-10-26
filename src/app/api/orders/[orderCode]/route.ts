// @ts-nocheck
import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { getRevolutPayment } from "@/utils/revolut";
import { turso } from "@/utils/turso";
import { NextRequest } from "next/server";

async function getSingleOrder(uid:string, orderCode: string) {
    try {
        const result = await turso.execute({
            sql: `SELECT *  FROM user_orders
            WHERE order_code = ? AND uid = ?`,
                args:[orderCode, uid],
        })
        if (result.rows.count == 0) throw new HttpException(`Order doesn't belong to you`, 403);
        const singleOrder = await getSingleOrder(orderCode);
        return {
            order: singleOrder,
            result,
        }
    } catch (e: any) {
        if (!(e instanceof HttpException))
            throw new HttpException(e.message, 500, {original: e.toString()});
        throw e;
    }
}


export async function GET(
    req: NextRequest,
    { params }: { params: { orderCode: string } }
) {
    try {
        const orderCode = params.orderCode;
        const user = await getUser(req);
        if (!orderCode)
            return Response.json({
                message: "Invalid data - orderCode is required",
            });
        const {order, result} = await getSingleOrder(user.uid, orderCode);
        const revolutPayment= await getRevolutPayment(result["rows"][0]["revolut_order_id"])
        return Response.json({
            message: "Order fetched succesfully",
            details: {
                ...order,
                revolutPayment,
            }
        });
    } catch (e) {
        if (e instanceof HttpException) {
            return e.getHttpResponse();
        }
        throw e;
    }

}

export async function HEAD(request: Request) {}
