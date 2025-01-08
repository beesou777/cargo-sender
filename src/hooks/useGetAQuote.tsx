"use client";
import { QUOTE_API } from "@/api/quote";
import { QuoteApiSchema } from "@/app/api/orders/zod";
import { KEYS } from "@/config/query-keys";
import useAuthStore from "@/store/auth";
import { components } from "@/types/eurosender-api-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

type QuoteRequestType = components["schemas"]["QuoteRequest"];

type OrderRequestType = QuoteRequestType & {
  orderContact: {
    email: string;
  };
};

export type QuoteResponseType = {
  message: string;
  data: components["schemas"]["QuoteRequest.QuoteResponse"];
} & { data: { error: string; details: { message: string }[] } };

export type OrderResponseType = {
  message: string;
  data: components["schemas"]["OrderRequest.OrderResponse"] & {
    revolutOrder: {
      checkout_url: string;
    };
  };
} & { data: { error: string; details: { message: string }[] } };

export interface QuoteErrorResponseType {
  name: string;
  message: string;
  details: {
    status: number;
    violations: Violation[];
    warnings: Warnings[];
    detail: string;
    type: string;
    title: string;
  };
}

interface Violation {
  propertyPath: string;
  message: string;
  code: null;
}

interface Warnings {
  parameterPath: string;
  message: string;
  code: null;
}

export function useGetAQuote() {
  const authStore = useAuthStore();

  return useMutation({
    mutationKey: [KEYS.GET_QUOTE],
    mutationFn: async (data: z.infer<typeof QuoteApiSchema>) => {
      const res = await axios.post(QUOTE_API.GET_QUOTATION, data);
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      return res.data as components["schemas"]["QuoteOrderResponse"];
    },
  });
}
