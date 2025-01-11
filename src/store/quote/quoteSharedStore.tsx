"use client";
import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";
import { LocationSelectValue } from "@/components/inputs/countySelect";
import { persist, createJSONStorage } from "zustand/middleware";

type quoteCacheCountryKeys = "pickupCountry" | "deliveryCountry";
type quoteCacheCityKeys = "pickupCity" | "deliveryCity";
type quoteCacheRegionKeys = "pickupRegion" | "deliveryRegion";

export type QuoteCountryResponseType = components["schemas"]["CountryResponse"];
export type QuoteCityResponseType =
  components["schemas"]["CityRequest.CityResponse"];
export type QuoteRegionResponseType =
  components["schemas"]["RegionRequest.RegionResponse"];

type quoteSharedStoreType = {
  unit: {
    weight: string;
    length: string;
    currency: string;
  };
  pickupCountry: QuoteCountryResponseType | null;
  pickupCity: QuoteCountryResponseType | null;
  pickupRegion: QuoteRegionResponseType | null;
  deliveryCountry: QuoteCountryResponseType | null;
  deliveryCity: QuoteCountryResponseType | null;
  deliveryRegion: QuoteRegionResponseType | null;
  setCountry: (
    key: quoteCacheCountryKeys,
    country: QuoteCountryResponseType
  ) => void;
  setCity: (key: quoteCacheCityKeys, region: QuoteCityResponseType) => void;
  setRegion: (
    key: quoteCacheRegionKeys,
    region: QuoteRegionResponseType
  ) => void;
  getService: () => string[];
  getLocations: () => {
    pickup: LocationSelectValue;
    delivery: LocationSelectValue;
  };
};
export const useQuoteSharedStore = create(
  persist<quoteSharedStoreType>(
    (set, get) => ({
      unit: {
        weight: "kg",
        length: "cm",
        currency: "€",
      },
      pickupCountry: "",
      pickupCity: "",
      pickupRegion: "",
      deliveryCountry: "",
      deliveryCity: "",
      deliveryRegion: "",
      setCountry: (key, value) => {
        set({ [key]: value });
      },
      setCity: (key, value) => {
        set({ [key]: value });
      },
      setRegion: (key, value) => {
        set({ [key]: value });
      },
      getService: () => {
        const response =
          get().deliveryCountry?.countryCustomFields?.supportedServiceTypeIds?.map(
            (service) => service
          ) ?? [];
        return response as unknown as string[];
      },
      getLocations: () => ({
        delivery: {
          country: get().deliveryCountry!,
          city: get().deliveryCity!,
          region: get().deliveryRegion!,
        },
        pickup: {
          country: get().pickupCountry!,
          city: get().pickupCity!,
          region: get().pickupRegion!,
        },
      }),
    }),
    {
      name: "quote-shared-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
