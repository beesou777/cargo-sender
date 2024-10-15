import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const REVOLUT_BASE_URL = "https://sandbox-merchant.revolut.com/api";

export interface IOrderData {
  amount: number;
  currency: "EUR";
  customerEmail: string;
  metadata: {};
  redirect_url: string;
}

interface IRevolutOrderDataResponse {
  id: string;
  token: string;
  type: string;
  state: string;
  created_at: string;
  updated_at: string;
  amount: number;
  currency: string;
  outstanding_amount: number;
  capture_mode: string;
  description: string;
  checkout_url: string;
  redirect_url: string;
  shipping: {
    address: {
      street_line_1: string;
      city: string;
      country_code: string;
      postcode: string;
    };
  };
  metadata: {
    product_type: string;
  };
  enforce_challenge: string;
  customer: {
    id: string;
    email: string;
  };
  merchant_order_data: {
    url: string;
  };
}

export async function createOrder(body: object) {
  const resp = await axios.post<
    AxiosRequestConfig<object>,
    AxiosResponse<IRevolutOrderDataResponse>
  >(`${REVOLUT_BASE_URL}/orders/{order_id}/payments`, body, {
    headers: {
      "Revolut-Api-Verson": "2024-09-01",
    },
  });
  return resp.data;
}
