// @ts-nocheck
import { components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { turso } from "@/utils/turso";
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";

async function getSingleOrder(uid:string, orderCode: string) {
    try {
        const result = await turso.execute({
            sql: `SELECT COUNT(*) AS count FROM user_orders
            WHERE order_code = ? AND uid = ?`,
                args:[orderCode, uid],
        })
        if (result.rows[0].count == 0) throw new HttpException(`Order doesn't belong to you`, 403);
        const url = `${baseUrl}/orders/${orderCode}`;
        const axiosRes = await axios.get<
            components["schemas"]["QuoteRequest"],
            AxiosResponse<components["schemas"]["QuoteOrderResponse"]>
        >(url, {
            headers: {
                "x-api-key": process.env.EURO_SENDER_API_KEY,
            },
        });
        return axiosRes.data;
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
        const order = await getSingleOrder(user.uid, orderCode);
        return Response.json({
            message: "Order fetched succesfully",
            details: order,
        });
    } catch (e) {
        if (e instanceof HttpException) {
            return e.getHttpResponse();
        }
        throw e;
    }

}

export async function HEAD(request: Request) {}
