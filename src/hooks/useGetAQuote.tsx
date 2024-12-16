"use client"
import { QUOTE_API } from "@/api/quote";
import { ORDER_API } from "@/api/order"
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useShipmentStore } from "@/store/quote/shipment";

import { components } from "@/types/eurosender-api-types";
import { notifications } from "@mantine/notifications";

import { useSteeper } from "@/store/step";
import React from "react";

type QuoteRequestType = components["schemas"]["QuoteRequest"]
export type QuoteResponseType = {
    message: string,
    data: components["schemas"]["QuoteRequest.QuoteResponse"]
} & { data: { error: string, details: { message: string }[] } }

export type OrderResponseType = {
    message: string,
    data: components["schemas"]["OrderRequest.OrderResponse"]
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

    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const { activeStep, setStep } = useSteeper();
    const [orders,setOrders] = React.useState([])

    const onSuccess = async (responseData: QuoteResponseType, status?: string | number) => {
        quoteResponseStore.setQuoteResponse(responseData)
        if ((responseData as any).error!) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later." + (responseData as any).error,
            })
            setSuccess(false)
            return
        }
        setSuccess(true)
    }

    const onOrderSuccess = async (responseData: OrderResponseType, status?: string | number) => {
        console.log(responseData)
        if ((responseData as any).error) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later. " + (responseData as any).error,
            });
            setSuccess(false);
            return;
        }

        console.log(responseData)
        console.log("hello")
    
        const checkoutUrl = responseData?.data?.revolutOrder?.checkout_url;
        if (checkoutUrl) {
            // Redirect the user to the checkout page
            window.location.href = checkoutUrl;
        } else {
            notifications.show({
                title: "Order Success",
                message: "Order created successfully, but no payment URL found.",
                color: "green",
            });
        }
    
        setSuccess(true);
    };
    

    const onError = async (error: QuoteErrorResponseType) => {
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

    const mutationFn2 = useMutation<OrderResponseType, OrderResponseType, QuoteErrorResponseType>(ORDER_API.GET_AN_ORDER, {
        onSuccess:onOrderSuccess,
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
            await mutationFn.mutate(dataToPost as QuoteRequestType)
            setStep(activeStep + 1)
        } catch (err) {
            setSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    const postOrder = async () => {
        try {
            if (!authStore.isAuthenticated) {
                notifications.show({
                    title: "Login to Continue",
                    message: "Please login to Proceed forward",
                    color: "yellow",
                });
                return;
            }
    
            const dataToPost = {
                shipment: {
                    ...shipmentStore.shipment,
                },
                orderContact: {
                    email: "order-contact@example.com",
                },
                ...getAQuoteData.quoteData,
            };
    
            await mutationFn2.mutate(dataToPost as OrderResponseType);
    
        } catch (err) {
            setSuccess(false);
            notifications.show({
                title: "Error",
                message: "An unexpected error occurred. Please try again later.",
                color: "red",
            });
        } finally {
            setIsLoading(false);
        }
    };
    

    return { success, mutation, postOrder, isLoading }
}
