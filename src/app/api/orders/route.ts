import { CargoSenderUser, components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { turso } from "@/utils/turso";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

async function createOrder(user: CargoSenderUser, payload: object) {
  const tx = await turso.transaction("write");
  try {
    console.log(user);
    let queryRes = await tx.execute({
      sql: `INSERT INTO user_orders(uid, name, email, order_code)
        VALUES (?, ?, ?, ?)
        RETURNING order_id`,
      args: [user.uid, user.name, user.email, null],
    });
    console.log(queryRes);
    const createdOrderId = queryRes.rows[0].order_id;
    const url = `${baseUrl}/orders`;
    const axiosRes = await axios.post<
      components["schemas"]["QuoteRequest"],
      AxiosResponse<components["schemas"]["OrderRequest.OrderResponse"]>
    >(
      url,
      {
        ...payload,
      },
      {
        headers: {
          "x-api-key": process.env.EURO_SENDER_API_KEY,
        },
      }
    );
    queryRes = await tx.execute({
      sql: `
        UPDATE user_orders SET order_code = ? WHERE order_id = ?`,
      args: [axiosRes.data.orderCode!, createdOrderId],
    });
    await tx.commit();
    return axiosRes.data;
  } catch (e: any) {
    tx.rollback();
    throw e;
  }
}

async function validateOrder(payload: object) {
  try {
    const url = `${baseUrl}/orders/validate_creation`;
    const axiosRes = await axios.post<
      components["schemas"]["QuoteRequest"],
      AxiosResponse<components["schemas"]["QuoteOrderResponse"]>
    >(
      url,
      {
        ...payload,
      },
      {
        headers: {
          "x-api-key": process.env.EURO_SENDER_API_KEY,
        },
      }
    );
    console.log({ status: axiosRes.status });
    return axiosRes.data;
  } catch (e: any) {
    throw e;
  }
}

export async function POST(req: NextRequest) {
  try {
    const query = getQueryParams(req);
    const body = await req.json();
    const validate = query.validate;
    const user = await getUser(req);
    const result =
      validate === "true"
        ? await validateOrder(body)
        : await createOrder(user, body);
    return NextResponse.json({
      message: validate === "true" ? "Order validated" : "Order created",
      data: result,
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
