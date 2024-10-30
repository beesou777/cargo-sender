import { components } from "@/types/eurosender-api-types";
import { create } from "zustand";

export type QuoteResponseType = components["schemas"]["QuoteRequest.QuoteResponse"]

type quoteResponseStoreType = {
    quoteResponse: QuoteResponseType | null,
    setQuoteResponse: (quoteResponse: QuoteResponseType) => void
}

export const useQuoteResponseStore = create<quoteResponseStoreType>((set) => ({
    quoteResponse: null,
    setQuoteResponse: (quoteResponse) => set(() => ({ quoteResponse }))
}))