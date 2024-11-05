import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useShipmentStore } from "@/store/quote/shipment";

import { components } from "@/types/eurosender-api-types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

import React from "react";

type QuoteRequestType = components["schemas"]["QuoteRequest"]
export type QuoteResponseType = {
    message: string,
    data: components["schemas"]["QuoteRequest.QuoteResponse"]
} & { data: { error: string, details: { message: string }[] } }

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
    const router = useRouter()
    const getAQuoteData = useGetAQuoteDataStore()
    const shipmentStore = useShipmentStore()
    const quoteResponseStore = useQuoteResponseStore()

    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)



    const onSuccess = async (responseData: QuoteResponseType, status?: string | number) => {

        quoteResponseStore.setQuoteResponse(responseData)
        if ((responseData as any).error!) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later.",
            })
            setSuccess(false)
        }
        else {
            setSuccess(true)

        }
    }

    const onError = async (error: QuoteErrorResponseType) => {

        quoteResponseStore.setQuoteRejectResponse(error)
        notifications.show({
            message: "Please Check the warning section and fix the errors and warnings.",
            color: "red"
        })
        setSuccess(false)
    }

    const mutationFn = useMutation<QuoteRequestType, QuoteResponseType, QuoteErrorResponseType>(QUOTE_API.GET_AN_ORDER, {
        onSuccess,
        onError
    })


    const mutation = async () => {
        try {
            if (!authStore.isAuthenticated) router.push("/login")
            const dataToPost = {
                shipment: {
                    ...shipmentStore.shipment
                },
                ...getAQuoteData.quoteData
            }
            setIsLoading(true)
            await mutationFn.mutate(dataToPost as QuoteRequestType)
            setSuccess(true)
        } catch (err) {
            setSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    return { success, mutation, isLoading }
}
