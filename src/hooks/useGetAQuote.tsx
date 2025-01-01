"use client";
import { QUOTE_API } from "@/api/quote";
import { ORDER_API } from "@/api/order";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useShipmentStore } from "@/store/quote/shipment";

import { components } from "@/types/eurosender-api-types";
import { notifications } from "@mantine/notifications";

import { useSteeper } from "@/store/step";
import React from "react";

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
  const getAQuoteData = useGetAQuoteDataStore();
  const shipmentStore = useShipmentStore();
  const quoteResponseStore = useQuoteResponseStore();

  const authStore = useAuthStore();
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { activeStep, setStep } = useSteeper();
  const [hasError, setHasError] = React.useState(false);
  // const hasErrorRef = React.useRef(false);
  const onSuccess = async (
    responseData: QuoteResponseType,
    status?: string | number
  ) => {
    if (
      (responseData as any).error! ||
      responseData?.data?.warnings?.length !== 0
    ) {
      setHasError(true);
      console.log({ responseData });
      notifications.show({
        message: responseData?.data?.warnings?.length
          ? responseData.data.warnings[0].message
          : "Service Error please contact with tech support",
        color: "red",
      });
      setSuccess(false);
      return;
    } else {
      quoteResponseStore.setQuoteResponse(responseData);
      setSuccess(true);
    }
  };

  const onOrderSuccess = async (
    responseData: OrderResponseType,
    status?: string | number
  ) => {
    if ((responseData as any).error) {
      notifications.show({
        message:
          "Something went wrong, couldn't proceed further. Try again later. " +
          (responseData as any).error,
      });
      setSuccess(false);
      return;
    }

    const checkoutUrl = responseData?.data?.revolutOrder?.checkout_url;
    if (checkoutUrl) {
      // Redirect the user to the checkout page
      typeof window !== "undefined" && (window.location.href = checkoutUrl);
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
    setHasError(true);

    // Safely check for `error.details` and its properties
    const detailMessage = error?.details?.detail;
    const violations = error?.details?.violations;

    if (detailMessage === "Route is not available") {
      notifications.show({
        title: "Error",
        message: "Route is not available for selected country",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Error",
        message: violations?.length
          ? violations[0]?.message
          : detailMessage
            ? detailMessage
            : "Something went wrong, couldn't proceed further. Try again later.",
        color: "red",
      });
    }
  };

  const mutationFn = useMutation<
    QuoteRequestType,
    QuoteResponseType,
    QuoteErrorResponseType
  >(QUOTE_API.GET_AN_ORDER, {
    onSuccess,
    onError,
  });

  const mutationFn2 = useMutation<
    OrderResponseType,
    OrderResponseType,
    QuoteErrorResponseType
  >(ORDER_API.GET_AN_ORDER + (authStore.isAuthenticated ? "" : "?anon=true"), {
    onSuccess: onOrderSuccess,
    onError,
  });

  const mutation = async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const dataToPost = {
        shipment: {
          ...shipmentStore.shipment,
        },
        preferredCouriersOnly: false,
        ...getAQuoteData.quoteData,
      };

      await mutationFn.mutate(dataToPost as QuoteRequestType);

      setHasError((prevHasError) => {
        if (prevHasError) {
          return prevHasError;
        } else {
          setSuccess(true);
          setStep(activeStep + 1);
          return prevHasError;
        }
      });
    } catch (err) {
      console.error("Unhandled exception during mutation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const QuoteService = async (serviceTypes?: string) => {
    try {
      setHasError(false);
      setIsLoading(true);

      // Determine serviceType based on serviceTypes or getAQuoteData
      const serviceType = serviceTypes
        ? getAQuoteData.quoteData.parcels?.pallets?.length > 0
          ? "freight"
          : getAQuoteData.quoteData.parcels?.envelopes?.length > 0
            ? "express"
            : "selection"
        : getAQuoteData.quoteData.serviceType;

      const dataToPost = {
        shipment: {
          ...shipmentStore.shipment,
          pickupDate: null,
        },
        preferredCouriersOnly: false,
        serviceType: serviceType,
        ...getAQuoteData.quoteData,
      };

      await mutationFn.mutate(dataToPost as QuoteRequestType);

      setHasError(false);
      setSuccess(true);
    } catch (err) {
      console.error("Unhandled exception during mutation:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const mutationBasicInformation = async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const serviceType =
        getAQuoteData.quoteData.parcels?.pallets?.length > 0
          ? "freight"
          : getAQuoteData.quoteData.parcels?.envelopes?.length > 0
            ? "express"
            : "selection";

      const dataToPost = {
        shipment: {
          ...shipmentStore.shipment,
          pickupDate: null,
        },
        preferredCouriersOnly: false,
        serviceType: serviceType,
        ...getAQuoteData.quoteData,
      };

      await mutationFn.mutate(dataToPost as QuoteRequestType);

      setHasError((prevHasError) => {
        if (prevHasError) {
          return prevHasError;
        } else {
          setSuccess(true);
          setStep(activeStep + 1);
          return prevHasError;
        }
      });
    } catch (err) {
      console.error("Unhandled exception during mutation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const postOrder = async () => {
    try {
      setIsLoading(true);

      const dataToPost: OrderRequestType = {
        ...getAQuoteData.quoteData,
        parcels: getAQuoteData.quoteData.parcels as OrderRequestType["parcels"],
        shipment: {
          ...shipmentStore.shipment,
        },
        paymentMethod: "credit",
        orderContact: {
          email: "order-contact@example.com",
        },
      };

      await mutationFn2.mutate(dataToPost as unknown as OrderResponseType);
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

  return {
    success,
    mutation,
    postOrder,
    isLoading,
    mutationBasicInformation,
    QuoteService,
  };
}
