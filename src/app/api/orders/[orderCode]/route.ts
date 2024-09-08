import { components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";

export async function getSingleOrder(orderCode: string) {
  try {
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
    console.log(e.response);
    return e.response.data;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { orderCode: string } },
) {
  const orderCode = params.orderCode;
  if (!orderCode)
    return Response.json({
      message: "Invalid data - orderCode is required",
    });
  const order = await getSingleOrder(orderCode);
  return Response.json({
    message: "Order fetched succesfully",
    details: order,
  });
}
