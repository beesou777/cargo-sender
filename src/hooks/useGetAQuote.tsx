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
import React, { useEffect } from "react";

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
    const [onErrors, setErrors] = React.useState<QuoteErrorResponseType | null>(null);
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        if (hasError) {
            console.log("Detected an error in state:", hasError);
            // Perform any additional actions after error detection
        }
    }, [hasError]);
    const onSuccess = async (responseData: QuoteResponseType, status?: string | number) => {
        console.log("onSuccess", responseData)
        if ((responseData as any).error!) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later." + (responseData as any).error,
            })
            setSuccess(false)
            return
        } else {
            quoteResponseStore.setQuoteResponse(responseData)
            setSuccess(true)
        }
    }

    const onOrderSuccess = async (responseData: OrderResponseType, status?: string | number) => {
        if ((responseData as any).error) {
            notifications.show({
                message: "Something went wrong, couldn't proceed further. Try again later. " + (responseData as any).error,
            });
            setSuccess(false);
            return;
        }

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
        console.error("Error response:", error);

        // Update state
        setErrors(error);
        setHasError(true);

        // Show error notifications
        notifications.show({
            title: "Error",
            message: error.details?.violations?.length
                ? error.details.violations.map((v) => `${v.propertyPath}: ${v.message}`).join(", ")
                : "Something went wrong, couldn't proceed further. Try again later.",
            color: "red",
        });
    };


    const mutationFn = useMutation<QuoteRequestType, QuoteResponseType, QuoteErrorResponseType>(
        QUOTE_API.GET_AN_ORDER,
        {
            onSuccess: () => {
                console.log("Mutation Success");
                setSuccess(true);
            },
            onError,
            onSettled: () => {
                console.log("Mutation Settled. Has error?", hasError);
            },
        }
    );

    const mutationFn2 = useMutation<OrderResponseType, OrderResponseType, QuoteErrorResponseType>(ORDER_API.GET_AN_ORDER, {
        onSuccess: onOrderSuccess,
        onError
    })


    const mutation = async () => {
        try {
            setErrors(null);
            setHasError(false);
            setIsLoading(true);

            if (!authStore.isAuthenticated) {
                notifications.show({
                    title: "Login to Continue",
                    message: "Please login to proceed forward.",
                    color: "yellow",
                });
                return;
            }

            const dataToPost = {
                shipment: {
                    ...shipmentStore.shipment,
                },
                ...getAQuoteData.quoteData,
            };

            let localHasError = false;

            // Call Mutation Function
            await mutationFn.mutateAsync(dataToPost as QuoteRequestType).catch((err) => {
                console.error("Caught error during mutation:", err);
                localHasError = true;
            });

            // Check for synchronous error handling
            if (localHasError) {
                console.log("Error occurred during mutation, skipping next steps.");
                return;
            }

            console.log("No errors detected, proceeding further...");
            setSuccess(true);
        } catch (err) {
            console.error("Unhandled exception during mutation:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Side Effect: Handle State Updates After Error
   

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
