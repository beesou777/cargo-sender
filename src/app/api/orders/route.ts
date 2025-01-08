import {
  CargoSenderUser,
  components,
  operations,
} from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { createRevolutOrder } from "@/utils/revolut";
import { prisma } from "@/utils/prisma";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { sendTransactionalEmail } from "@/utils/send-email";
import { render } from "@react-email/components";
import { OrderConfirmationEmail } from "@/emails/order-email";
import { addCommissionToPrice } from "@/utils/price";

async function createOrder(
  user: CargoSenderUser | null,
  payload: operations["api_v1orders_post"]["requestBody"]["content"]["application/json"]
) {
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
      }
    );
    const data = axiosRes.data;
    const { netPrice } = addCommissionToPrice(data);

    const revolutOrder = await createRevolutOrder(
      +netPrice.toFixed(2),
      "EUR",
      data.orderCode!
    );

    const userOrder = await prisma.userOrder.create({
      data: {
        uid: user?.uid ?? "anon",
        name: user?.name ?? "anon",
        email: user?.email ?? data.email ?? "anon@gmail.com",
        order_code: data.orderCode ?? null,
        revolut_order_id: revolutOrder.id,
      },
    });

    // Send email to user
    // @TODO - Delegate sending emails to a messaging queue
    const userEmail = user?.email ?? data.email;
    userEmail &&
      (await sendTransactionalEmail({
        to: userEmail,
        subject: "Order created succesfully",
        htmlContent: await render(
          OrderConfirmationEmail({
            data,
          })
        ),
      }));

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
      }
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
    const anon = req.nextUrl.searchParams.get("anon");
    const body = await req.json();
    const validate = query.validate;
    const user = anon === "true" ? null : await getUser(req);
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
