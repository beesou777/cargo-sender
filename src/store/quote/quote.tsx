import { components } from "@/types/eurosender-api-types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid"; // Import v4 for unique ID generation



type serviceTypeEnum = "selection" | "flexi" | "regular_plus" | "express" | "freight" | undefined

export type parcelsItemType = components["schemas"]["PackageRequest"]

export type parcelTypeEnum = keyof components["schemas"]["ParcelsRequest"]

export type parcelPayload = {
    parcelId?: string,
    quantity: number
    width?: number //centimeters
    height?: number //centimeters
    length?: number //centimeters
    weight?: number //kg
}
type parcelsType = {
    envelopes: parcelPayload[]
    packages: parcelPayload[]
    pallets: parcelPayload[]
}


type quoteDataType = Omit<components["schemas"]["QuoteRequest"], "shipment" | "parcels"> & {
    parcels: parcelsType
}

type getAQuoteStoreType = {
    quoteData: quoteDataType
    updateServiceType: (value: serviceTypeEnum) => void
    updateInsuranceId: (value: number | null | undefined) => void
    addParcel: (type: parcelTypeEnum) => void
    updateParcel: (type: parcelTypeEnum, index: number, data: parcelPayload) => void
    removeParcel: (type: parcelTypeEnum, index: number) => void
}

const getNewParcel = (data: parcelPayload = {
    quantity: 1,
    width: undefined,
    height: undefined,
    length: undefined,
    weight: undefined,
}): parcelsItemType => {
    return {
        parcelId: uuidv4(), // Generating unique parcel ID
        ...data
    }
}

// Initial quote data state
const initialState: quoteDataType = {
    parcels: {
        envelopes: [],
        pallets: [],
        packages: []
    } as parcelsType,
    paymentMethod: "credit",
    currencyCode: "EUR",
    serviceType: "selection",
    courierTag: null,
    preferredCouriersOnly: false,
    courierId: null,
    insuranceId: null,
    labelFormat: null
};

export const useGetAQuoteDataStore = create<getAQuoteStoreType>((set, get) => ({
    quoteData: initialState,

    // Update service type in the quote data
    updateServiceType(value) {
        set((state) => {
            const newQuoteData = { ...state.quoteData };
            newQuoteData.serviceType = value;
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
    addParcel(type,) {
        set((state) => {
            const newQuoteData = { ...state.quoteData };

            if (Object.hasOwn(newQuoteData.parcels, type)) {
                // @ts-ignore - Add new parcel to the selected type
                newQuoteData.parcels[type].push(getNewParcel());
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
                newQuoteData.parcels[type][index] = { ...newQuoteData.parcels[type][index], ...data };
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
}))


