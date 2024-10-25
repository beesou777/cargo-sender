import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";

type countrySchemaType = components["schemas"]["CountryResponse"]

type quoteCacheCountryKeys = "pickupCountry" | "deliveryCountry"

type quoteCacheStoreType = {
    pickupCountry: countrySchemaType | null
    deliveryCountry: countrySchemaType | null
    setCountry: (key: quoteCacheCountryKeys, country: countrySchemaType) => void
}

export const quoteCacheStore = create<quoteCacheStoreType>((set, get) => ({
    pickupCountry: null,
    deliveryCountry: null,
    setCountry: (key, country) => set({ [key]: country }),
}))