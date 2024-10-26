import { components } from "@/types/eurosender-api-types";
import { baseUrl } from "@/utils/constants";
import axios, { AxiosResponse } from "axios";

type OrderResponse = components["schemas"]["OrderRequest.OrderResponse"];

export interface EuroSenderOrder extends OrderResponse {}

export const getSingleOrderFromEuroSender = async (
  orderCode: string,
): Promise<EuroSenderOrder> => {
  const url = `${baseUrl}/orders/${orderCode}`;
  const axiosRes = await axios.get<
    components["schemas"]["QuoteRequest"],
    AxiosResponse<EuroSenderOrder>
  >(url, {
    headers: {
      "x-api-key": process.env.EURO_SENDER_API_KEY,
    },
  });
  return axiosRes.data;
};
