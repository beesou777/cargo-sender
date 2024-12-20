import {
  QuoteErrorResponseType,
  QuoteResponseType,
} from "@/hooks/useGetAQuote";
import { create } from "zustand";

type quoteResponseStoreType = {
  quoteResponse: QuoteResponseType | null;
  setQuoteResponse: (quoteResponse: QuoteResponseType) => void;
  getQuoteResponse: () => QuoteResponseType | null;

  quoteReject: QuoteErrorResponseType | null;
  setQuoteRejectResponse: (quoteRejectResponse: QuoteErrorResponseType) => void;

  reset: () => void;
};

export const useQuoteResponseStore = create<quoteResponseStoreType>(
  (set, get) => ({
    quoteResponse: null,
    setQuoteResponse: (quoteResponse) =>
      set(() => {
        get().reset();
        return { quoteResponse };
      }),

    quoteReject: null,
    setQuoteRejectResponse: (quoteReject) =>
      set(() => {
        get().reset();
        return { quoteReject };
      }),

    getQuoteResponse: () => get().quoteResponse,

    reset: () => set(() => ({ quoteResponse: null, quoteReject: null })),
  }),
);
