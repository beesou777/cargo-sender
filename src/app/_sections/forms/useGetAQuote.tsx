import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import useAuthStore from "@/store/auth";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { components, operations } from "@/types/eurosender-api-types";
import { redirect } from "next/navigation";
import React from "react";

export function useGetAQuote() {
    const getAQuoteData = useGetAQuoteDataStore()
    const authStore = useAuthStore()
    const [success, setSuccess] = React.useState(false)

    const onSuccess = async (responseData: components["schemas"]["QuoteRequest"]) => {
        console.log("Quote Data:", responseData)
    }

    const mutationFn = useMutation<components["schemas"]["QuoteRequest"], components["schemas"]["QuoteRequest"]>(QUOTE_API.GET_AN_ORDER, {
        onSuccess
    })


    const mutation = async (postData: components["schemas"]["QuoteRequest"]) => {
        try {
            if (!authStore.isAuthenticated) redirect("/login")
            await mutationFn.mutate(postData)
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
    }

    return { success, mutation: mutation }
}
