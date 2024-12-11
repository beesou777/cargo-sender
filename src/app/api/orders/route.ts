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
  try {
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
    console.log(axiosRes.data);
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
    let queryRes = await turso.execute({
      sql: `INSERT INTO user_orders(uid, name, email, order_code)
        VALUES (?, ?, ?, ?)
        RETURNING order_id`,
      args: [user.uid, user.name, user.email, data.orderCode ?? null],
    });
    console.log("User order is created");
    const createdOrderId = queryRes.rows[0].order_id;
    console.log("Created revolut order");
    console.log([axiosRes.data.orderCode!, revolutOrder.id!, createdOrderId]);

    console.log("I updated order");
    return { ...data, revolutOrder };
  } catch (e: any) {
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
