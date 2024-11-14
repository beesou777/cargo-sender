import axios, { AxiosResponse } from "axios";

export interface CreateOrderResponseInterface {
  id: string;
  token: string;
  type:
    | "payment"
    | "payment_request"
    | "refund"
    | "charge_back"
    | "chargeback_reversal"
    | "credit_reimburement";
  state:
    | "pending"
    | "processing"
    | "authorized"
    | "completed"
    | "cancelled"
    | "failed";
  created_at: string;
  updated_at: string;
}

export interface RevolutOrderData {
  id: string;
  token: string;
  type: string;
  state: string;
  created_at: string;
  updated_at: string;
  amount: number;
  currency: string;
  refunded_amount: number;
  outstanding_amount: number;
  capture_mode: string;
  payments: Payment[];
  enforce_challenge: string;
  customer: Customer;
}

const REVOLUT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Revolut-Api-Version": "2024-09-01",
  Authorization: `Bearer ${process.env.REVOLUT_SECRET_API_KEY}`,
};

export async function createRevolutOrder(
  amount: number,
  currency = "EUR",
): Promise<CreateOrderResponseInterface> {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sandbox-merchant.revolut.com/api/orders",
    headers: REVOLUT_HEADERS,
    data: {
      amount: amount * 100,
      currency,
    },
  };
  const res = await axios<unknown, AxiosResponse<CreateOrderResponseInterface>>(
    config,
  );
  return res.data;
}

export async function getRevolutPayment(
  revolutOrderId: string,
): Promise<RevolutOrderData> {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://sandbox-merchant.revolut.com/api/orders/${revolutOrderId}`,
    headers: REVOLUT_HEADERS,
  };

  const res = await axios<unknown, AxiosResponse<RevolutOrderData>>(config);
  return res.data;
}
