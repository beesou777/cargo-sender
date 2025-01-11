"use client";
import { components } from "@/types/eurosender-api-types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid"; // Import v4 for unique ID generation
import { createJSONStorage, persist } from "zustand/middleware";

export const serviceTypes: {
  name: string;
  service: ServiceType;
}[] = [
  {
    name: "Selection (Standard)",
    service: "selection",
  },
  {
    name: "Flexi (Standard-Flexi)",
    service: "flexi",
  },
  {
    name: "Regular plus (Priority)",
    service: "regular_plus",
  },
  {
    name: "Express (Priority Express)",
    service: "express",
  },
  {
    name: "Freight",
    service: "freight",
  },
  {
    name: "Freight priority",
    service: "freight_priority" as ServiceType,
  },
];

export type ServiceType =
  | "selection"
  | "flexi"
  | "regular_plus"
  | "express"
  | "freight"
  | undefined;

export type parcelsItemType = components["schemas"]["PackageRequest"];

export type parcelTypeEnum = keyof components["schemas"]["ParcelsRequest"];

export type parcelPayload = {
  parcelId?: string;
  quantity: number;
  width?: number; //centimeters
  height?: number; //centimeters
  length?: number; //centimeters
  weight?: number; //kg
  value?: number;
};
type parcelsType = {
  envelopes: parcelPayload[];
  packages: parcelPayload[];
  pallets: parcelPayload[];
};

type quoteDataType = Omit<
  components["schemas"]["QuoteRequest"],
  "shipment" | "parcels"
> & {
  parcels: parcelsType;
};

type getAQuoteStoreType = {
  quoteData: quoteDataType;
  updateServiceType: (value: ServiceType) => void;
  updateInsuranceId: (value: number | null | undefined) => void;
  addParcel: (type: parcelTypeEnum) => void;
  updateParcel: (
    type: parcelTypeEnum,
    index: number,
    data: parcelPayload
  ) => void;
  removeParcel: (type: parcelTypeEnum, index: number) => void;
  resetParcels: () => void;
};

const getNewParcel = (
  data: parcelPayload = {
    quantity: 1,
    width: undefined,
    height: undefined,
    length: undefined,
    weight: undefined,
    value: undefined,
  },
  type?: parcelTypeEnum
): parcelsItemType => {
  if (type === "envelopes")
    return {
      parcelId: uuidv4(),
      quantity: data.quantity,
      weight: data.weight,
    };
  return {
    parcelId: uuidv4(), // Generating unique parcel ID
    ...data,
  };
};

// Initial quote data state
const initialState: quoteDataType = {
  parcels: {
    envelopes: [],
    pallets: [],
    packages: [],
  } as parcelsType,
  paymentMethod: "credit",
  currencyCode: "EUR",
  serviceType: "selection",
  courierTag: null,
  courierId: null,
  insuranceId: null,
  labelFormat: "pdf",
};

export const useGetAQuoteDataStore = create(
  persist<getAQuoteStoreType>(
    (set, get) => {
      return {
        quoteData: initialState,

        // Update service type in the quote data
        updateServiceType(value) {
          set((state) => {
            const newQuoteData = { ...state.quoteData };
            newQuoteData.serviceType = value;
            console.log({ newQuoteData });
            return { quoteData: newQuoteData };
          });
        },

        // Update insurance ID
        updateInsuranceId(value) {
          set((state) => {
            const newQuoteData = { ...state.quoteData };
            newQuoteData.insuranceId = value;
            return { quoteData: newQuoteData };
          });
        },

        // Add a new parcel of the given type (envelopes, packages, pallets)
        addParcel(type) {
          set((state) => {
            const newQuoteData = { ...state.quoteData };

            if (Object.hasOwn(newQuoteData.parcels, type)) {
              // @ts-ignore - Add new parcel to the selected type
              newQuoteData.parcels[type].push(getNewParcel());
              if (
                type === "pallets" &&
                newQuoteData.parcels[type].length === 1
              ) {
                newQuoteData.serviceType = "freight";
              }

              if (
                type === "envelopes" &&
                newQuoteData.parcels[type].length === 1
              ) {
                newQuoteData.serviceType = "express";
              }

              if (
                type === "packages" &&
                newQuoteData.parcels[type].length === 1
              ) {
                newQuoteData.serviceType = "selection";
              }
            }
            return { quoteData: newQuoteData };
          });
        },

        // Update an existing parcel by its index
        updateParcel(type, index, data) {
          set((state) => {
            const newQuoteData = { ...state.quoteData };

            if (Object.hasOwn(newQuoteData.parcels, type)) {
              // @ts-ignore - Update parcel at specified index
              newQuoteData.parcels[type][index] = {
                ...newQuoteData.parcels[type][index],
                ...data,
              };
            }
            return { quoteData: newQuoteData };
          });
        },

        // Remove a parcel from the list by its index
        removeParcel(type, index) {
          set((state) => {
            const newQuoteData = { ...state.quoteData };

            if (Object.hasOwn(newQuoteData.parcels, type)) {
              // @ts-ignore - Remove parcel at specified index
              newQuoteData.parcels[type].splice(index, 1);
            }
            return { quoteData: newQuoteData };
          });
        },
        resetParcels() {
          set(() => ({ quoteData: initialState }));
        },
      };
    },
    {
      name: "quote-data-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
