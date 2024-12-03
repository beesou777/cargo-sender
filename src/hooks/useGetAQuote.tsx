"use client"
import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useShipmentStore } from "@/store/quote/shipment";

import { components } from "@/types/eurosender-api-types";
import { notifications } from "@mantine/notifications";

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
    const getAQuoteData = useGetAQuoteDataStore()
    const shipmentStore = useShipmentStore()
    const quoteResponseStore = useQuoteResponseStore()
    console.log(shipmentStore.shipment)

    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)



    const onSuccess = async (responseData: QuoteResponseType, status?: string | number) => {
        console.log(responseData)
        quoteResponseStore.setQuoteResponse(responseData)
        if ((responseData as any).error!) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later."+(responseData as any).error,
            })
            setSuccess(false)
        }
        else {
            setSuccess(true)
        }
    }

    const onError = async (error: QuoteErrorResponseType) => {
        console.error(error.details);
        notifications.show({
            title: "Error",
            message: error.details.warnings
                .map((warning) => `${warning.parameterPath}: ${warning.message}`)
                .join(", "),
            color: "red"
        });
        setSuccess(false);
    };

    const mutationFn = useMutation<QuoteRequestType, QuoteResponseType, QuoteErrorResponseType>(QUOTE_API.GET_AN_ORDER, {
        onSuccess,
        onError
    })


    const mutation = async () => {
        try {
            if (!authStore.isAuthenticated) {
                notifications.show({
                    title: "Login to Continue",
                    message: "Please login to Proceed forward",
                    color: "yellow"
                })
            }
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
