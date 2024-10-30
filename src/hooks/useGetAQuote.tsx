import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useShipmentStore } from "@/store/quote/shipment";

import { components } from "@/types/eurosender-api-types";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import React from "react";

type QuoteRequestType = components["schemas"]["QuoteRequest"]
type QuoteResponseType = {
    message: string,
    data: components["schemas"]["QuoteRequest.QuoteResponse"]
} & { error: string, details: { message: string }[] }

interface QuoteErrorResponseType {
    name: string;
    message: string;
    details: {
        status: number;
        violations: Violation[];
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


export function useGetAQuote() {
    const getAQuoteData = useGetAQuoteDataStore()
    const shipmentStore = useShipmentStore()
    const quoteResponseStore = useQuoteResponseStore()

    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)


    const onSuccess = async (responseData: QuoteResponseType, status?: string | number) => {
        console.log("Quote Data:", responseData)
        if (responseData.error) {
            responseData.details?.forEach(item => {
                console.log(item)
                notifications.show({
                    title: `${responseData.error}`,
                    message: item.message,
                    color: "red"
                })
            })
            setSuccess(false)
        }
        else {
            quoteResponseStore.setQuoteResponse(responseData.data)
            responseData.data.warnings?.forEach(item => {
                console.log(item)
                notifications.show({
                    title: `${item.parameterPath} ${item.code}`,
                    message: item.message,
                    color: "yellow"
                })
            })
            setSuccess(true)

        }
    }

    const onError = async (error: QuoteErrorResponseType) => {
        console.log("ERROR", error)
        error.details.violations?.forEach(item => {
            console.log(item)
            notifications.show({
                title: `${item.propertyPath} ${item.code}`,
                message: item.message,
                color: "red"
            })
        })
        setSuccess(false)
    }

    const mutationFn = useMutation<QuoteRequestType, QuoteResponseType, QuoteErrorResponseType>(QUOTE_API.GET_AN_ORDER, {
        onSuccess,
        onError
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
            console.log("MUTATION DATA", { dataToPost })
            await mutationFn.mutate(dataToPost as QuoteRequestType)
            setSuccess(true)
        } catch (err) {
            setSuccess(false)
        }
    }

    return { success, mutation: mutation }
}
