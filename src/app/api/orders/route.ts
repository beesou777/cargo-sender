import { CargoSenderUser, components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { createRevolutOrder } from "@/utils/revolut";
import { turso } from "@/utils/turso";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

async function createOrder(user: CargoSenderUser, payload: object) {
  const tx = await turso.transaction("write");
  try {
    let queryRes = await tx.execute({
      sql: `INSERT INTO user_orders(uid, name, email, order_code)
        VALUES (?, ?, ?, ?)
        RETURNING order_id`,
      args: [user.uid, user.name, user.email, null],
    });
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
      },
    );
    const data = axiosRes.data;
    const createdOrderPrice = data?.parcels
      ? Object.keys(data.parcels).reduce((acc, parcelValue) => {
          if (!parcelValue) return acc;
          if (!Array.isArray(parcelValue)) return acc;
          const unitPrice = parcelValue
            ? parcelValue.reduce((accInner, priceValue) => {
                return accInner + priceValue.price.original.net;
              }, 0)
            : 0;
          return acc + unitPrice;
        }, 0)
      : 0;

    const discount = data.discount?.discount?.original?.net ?? 0;

    const revolutOrder = await createRevolutOrder(createdOrderPrice - discount);

    queryRes = await tx.execute({
      sql: `
        UPDATE user_orders SET order_code = ?, revolut_order_id = ? WHERE order_id = ?`,
      args: [axiosRes.data.orderCode!, revolutOrder.id!, createdOrderId],
    });
    await tx.commit();
    return { ...data, revolutOrder };
  } catch (e: any) {
    tx.rollback();
    if (e?.response?.status) {
      throw new HttpException("Order validation error", 400, {
        cargoSenderHttpStatus: e?.response?.status,
        cargoSenderError: e?.response?.data,
      });
    }
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
      },
    );
    return axiosRes.data;
  } catch (e: any) {
    throw new HttpException("Order validation error", 400, {
      cargoSenderHttpStatus: e?.response?.status,
      cargoSenderError: e?.response?.data,
    });
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
