import { QUOTE_API } from "@/api/quote";
import useMutation from "@/hooks/useMutation";
import { components, operations } from "@/types/eurosender-api-types";

export function useGetAQuote (postData:operations["api_v1quotes_post"]) {
    const {data, isLoading, isError} = useMutation<operations["api_v1quotes_post"],components["schemas"]["QuoteRequest"]>(QUOTE_API.GET_AN_ORDER,postData)


    
}