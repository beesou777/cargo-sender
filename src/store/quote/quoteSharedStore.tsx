import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";
import { useGetAQuoteDataStore } from "./quote";
import { LocationSelectValue } from "@/components/inputs/countySelect";


type quoteCacheCountryKeys = "pickupCountry" | "deliveryCountry"
type quoteCacheCityKeys = "pickupCity" | "deliveryCity"
type quoteCacheRegionKeys = "pickupRegion" | "deliveryRegion"



export type QuoteCountryResponseType = components["schemas"]["CountryResponse"]
export type QuoteCityResponseType = components["schemas"]["CityRequest.CityResponse"]
export type QuoteRegionResponseType = components["schemas"]["RegionRequest.RegionResponse"]



type quoteSharedStoreType = {
    unit: {
        weight: string,
        length: string
    },
    pickupCountry: QuoteCountryResponseType | null,
    pickupCity: QuoteCountryResponseType | null,
    pickupRegion: QuoteCountryResponseType | null,
    deliveryCountry: QuoteCountryResponseType | null,
    deliveryCity: QuoteCountryResponseType | null,
    deliveryRegion: QuoteCountryResponseType | null,
    setCountry: (key: quoteCacheCountryKeys, country: QuoteCountryResponseType) => void
    setCity: (key: quoteCacheCityKeys, region: QuoteCityResponseType) => void
    setRegion: (key: quoteCacheRegionKeys, region: QuoteRegionResponseType) => void
    getService: () => string[]
    getLocations: () => { pickup: LocationSelectValue, delivery: LocationSelectValue }

}

export const useQuoteSharedStore = create<quoteSharedStoreType>((set, get) => ({
    unit: {
        weight: "Kg",
        length: "Cm"
    },
    pickupCountry: null,
    pickupRegion: null,
    pickupCity: null,
    deliveryCountry: null,
    deliveryRegion: null,
    deliveryCity: null,
    setCountry: (key, country) => set({ [key]: country }),
    setCity: (key, region) => set({ [key]: region }),
    setRegion: (key, region) => set({ [key]: region }),
    getService: () => {
        const response = get().deliveryCountry?.countryCustomFields?.supportedServiceTypeIds?.map(service => service) ?? [];
        return response as unknown as string[];
    },
    getLocations: () => ({
        delivery: { country: get().deliveryCountry!, city: get().deliveryCity!, region: get().deliveryRegion! },
        pickup: { country: get().pickupCountry!, city: get().pickupCity!, region: get().pickupRegion! }
    })

}))