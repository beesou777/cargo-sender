import { components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { QuoteApiSchema } from "./zod";

async function createOrder(payload: object) {
  try {
    const url = `${baseUrl}/orders`;
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
    console.log(e.response);
    return e.response.data;
  }
}

export async function validateOrder(payload: object) {
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
    console.log(e.response.data);
    return e.response.data;
  }
}

export async function POST(req: NextRequest) {
  try {
    const query = getQueryParams(req);
    const body = await req.json();
    const validate = query.validate;
    QuoteApiSchema.parse(body);
    const result =
      validate === "true" ? validateOrder(body) : await createOrder(body);
    return Response.json({
      message: validate === "true" ? "Order validated" : "Order created",
      data: result,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return { ...zodToError(e) };
    }
  }
}
