import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useShipmentStore } from "@/store/quote/shipment";

import { components, operations } from "@/types/eurosender-api-types";
import { redirect } from "next/navigation";
import React from "react";

type QuoteRequestType = components["schemas"]["QuoteRequest"]
type QuoteResponseType = components["schemas"]["QuoteOrderResponse"]


export function useGetAQuote() {
    const getAQuoteData = useGetAQuoteDataStore()
    const shipmentStore = useShipmentStore()

    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)
    const [response, setResponse] = React.useState<QuoteResponseType>()


    const onSuccess = async (responseData: QuoteResponseType) => {
        setResponse(responseData)
        console.log("Quote Data:", responseData)
    }

    const mutationFn = useMutation<QuoteRequestType, QuoteResponseType>(QUOTE_API.GET_AN_ORDER, {
        onSuccess
    })


    const mutation = async () => {
        try {
            if (!authStore.isAuthenticated) redirect("/login")
            const dataToPost = {
                shipment: {
                    ...shipmentStore.shipment
                },
                ...getAQuoteData.quoteData
            }
            await mutationFn.mutate(dataToPost as QuoteRequestType)
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
    }

    return { success, mutation: mutation, response }
}
