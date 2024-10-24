import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";

type ShipmentRequest = components["schemas"]["ShipmentRequest"];
export type ShipmentAddressType = components["schemas"]["ShipmentAddressRequest"];
export type ShipmentContactType = components["schemas"]["ShipmentContactRequest"];

type ShipmentAddressKey = "pickupAddress" | "deliveryAddress";
type ShipmentContactKey = "pickupContact" | "deliveryContact";

const defaultAddressObject: ShipmentAddressType = {
    country: "", // Default to an empty string or set a valid default country code
    zip: "", // Optional, can be left empty
    city: "", // Optional, can be left empty
    cityId: 0, // Default to 0 or a valid city ID
    street: "", // Optional, can be left as an empty string
    additionalInfo: null, // Set to null as default or provide default info
    region: "", // Optional, can be left as an empty string
    regionCode: "", // Optional, default to an empty string
    regionId: 0, // Default to 0 or a valid region ID
    timeZoneName: "", // Optional, default to an empty string
    customFields: {}, // Default to an empty object
};

// Initial state for the shipment store
const initialShipment: ShipmentRequest = {
    pickupAddress: defaultAddressObject,
    deliveryAddress: defaultAddressObject,
    pickupDate: "",
    pickupContact: null,
    deliveryContact: null,
    addOns: [] as unknown as "flexibleChanges"
};

type ShipmentStore = {
    shipment: ShipmentRequest;
    setShipmentAddress: (key: ShipmentAddressKey, shipmentAddress: ShipmentAddressType) => void;
    setPickupDate: (pickupDate: string) => void;
    setShipmentContact: (key: ShipmentContactKey, shipmentContact: ShipmentContactType | null) => void;
    setAddOns: (addOns: ShipmentRequest["addOns"]) => void;
};

export const useShipmentStore = create<ShipmentStore>((set) => ({
    shipment: initialShipment, // Use the initial shipment as the default state

    // Function to set pickup or delivery address
    setShipmentAddress: (key, shipmentAddress) => {
        set((state) => ({
            shipment: {
                ...state.shipment,
                [key]: { ...shipmentAddress },
            },
        }));
    },

    // Function to set pickup date
    setPickupDate: (pickupDate) => {
        set((state) => ({
            shipment: {
                ...state.shipment,
                pickupDate,
            },
        }));
    },

    // Function to set pickup or delivery contact
    setShipmentContact: (key, shipmentContact) => {
        set((state) => ({
            shipment: {
                ...state.shipment,
                [key]: shipmentContact,
            },
        }));
    },

    // Function to set add-ons
    setAddOns: (addOns) => {
        set((state) => ({
            shipment: {
                ...state.shipment,
                addOns,
            },
        }));
    },
}));
