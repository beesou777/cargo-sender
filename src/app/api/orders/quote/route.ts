// @ts-nocheck
import { components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import { HttpException } from "@/utils/errors";
import { zodToError } from "@/utils/zod_error_handler";
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { QuoteApiSchema } from "../zod";

const quoteOrder = async (payload: Object) => {
  try {
    const url = `${baseUrl}/quotes`;
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
    throw new HttpException(e.message, 500, {
      axiosResponse: e.response.data,
    });
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    QuoteApiSchema.parse(body);
    const result = await quoteOrder(body);
    return Response.json(
      {
        message: "Quote order",
        data: result,
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    if (e instanceof ZodError) {
      return { ...zodToError(e) };
    }
    if (e instanceof HttpException) return e.getHttpResponse();
    throw e;
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "1mb",
//     },
//   },
//   maxDuration: 10,
// };
