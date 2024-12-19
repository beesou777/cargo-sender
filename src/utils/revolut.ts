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

interface PaymentFee {
  type: string;
  amount: number;
  currency: string;
}

interface PaymentChecks {
  three_ds: {
    eci: string;
    state: string;
    version: number;
  };
  cvv_verification: string;
}

interface PaymentMethod {
  type: string;
  card_brand: string;
  funding: string;
  card_country_code: string;
  card_bin: string;
  card_last_four: string;
  card_expiry: string;
  cardholder_name: string;
  checks: PaymentChecks;
}

interface Payment {
  id: string;
  state: string;
  created_at: string;
  updated_at: string;
  amount: number;
  currency: string;
  settled_amount: number;
  settled_currency: string;
  risk_level: string;
  fees: PaymentFee[];
  payment_method: PaymentMethod;
}

interface Customer {
  id: string;
  email: string;
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
  orderCode: string,
): Promise<CreateOrderResponseInterface> {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sandbox-merchant.revolut.com/api/orders",
    headers: REVOLUT_HEADERS,
    data: {
      amount: amount * 100,
      currency,
      redirect_url: `${process.env.MAIN_DOMAIN}/cargo-quote/success?orderId=${orderCode}`,
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

export async function cancelRevolutOrder(
  revolutOrderId: string,
): Promise<boolean> {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://sandbox-merchant.revolut.com/api/orders/${revolutOrderId}/cancel`,
    headers: REVOLUT_HEADERS,
  };

  const res = await axios<unknown, AxiosResponse<RevolutOrderData>>(config);
  return res.status === 200 || res.status === 201;
}
