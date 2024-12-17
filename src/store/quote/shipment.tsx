"use client";
import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";
import { LocationSelectValue } from "@/components/inputs/countySelect";
import { getInitialValueFromStorage } from "@/utils/store";

type ShipmentRequest = components["schemas"]["ShipmentRequest"];
export type ShipmentAddressType =
  components["schemas"]["ShipmentAddressRequest"];
export type ShipmentContactType =
  components["schemas"]["ShipmentContactRequest"];

type ShipmentAddressKey = "pickupAddress" | "deliveryAddress";
type ShipmentContactKey = "pickupContact" | "deliveryContact";

const defaultAddressObject: ShipmentAddressType = {
  country: "", // Default to an empty string or set a valid default country code
  zip: "", // Optional, can be left empty
  city: "", // Optional, can be left empty
  cityId: 0 || null, // Default to 0 or a valid city ID
  street: "", // Optional, can be left as an empty string
  additionalInfo: null, // Set to null as default or provide default info
  region: "", // Optional, can be left as an empty string
  regionCode: "", // Optional, default to an empty string
  regionId: 0 || null, // Default to 0 or a valid region ID
  timeZoneName: "", // Optional, default to an empty string
  customFields: [], // Default to an empty object
};

// Initial state for the shipment store
const initialShipment: ShipmentRequest = {
  pickupAddress: defaultAddressObject,
  deliveryAddress: defaultAddressObject,
  pickupDate: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
  pickupContact: null,
  deliveryContact: null,
  // @ts-ignore
  addOns: [],
};

type ShipmentStore = {
  shipment: ShipmentRequest;
  setShipmentAddress: (
    key: ShipmentAddressKey,
    shipmentAddress: ShipmentAddressType,
  ) => void;
  setPickupDate: (pickupDate: Date) => void;
  setShipmentContact: (
    key: ShipmentContactKey,
    shipmentContact: ShipmentContactType | null,
  ) => void;
  setAddOns: (addOns: ShipmentRequest["addOns"]) => void;
  mapLocationToShipmentAddress: (
    data: LocationSelectValue,
  ) => ShipmentAddressType;
};

export const useShipmentStore = create<ShipmentStore>((set, get) => ({
  shipment:
    getInitialValueFromStorage<ShipmentRequest>("shipment") || initialShipment, // Use the initial shipment as the default state

  // Function to set pickup or delivery address
  setShipmentAddress: (key, shipmentAddress) => {
    set((state) => ({
      shipment: {
        ...state.shipment,
        [key]: { ...shipmentAddress },
      },
    }));
    localStorage.setItem("shipment", JSON.stringify(get().shipment));
  },

  // Function to set pickup date
  setPickupDate: (pickupDate) => {
    set((state) => ({
      shipment: {
        ...state.shipment,
        pickupDate: pickupDate.toISOString(),
      },
    }));
    localStorage.setItem("shipment", JSON.stringify(get().shipment));
  },

  // Function to set pickup or delivery contact
  setShipmentContact: (key, shipmentContact) => {
    set((state) => ({
      shipment: {
        ...state.shipment,
        [key]: shipmentContact,
      },
    }));
    localStorage.setItem("shipment", JSON.stringify(get().shipment));
  },

  // Function to set add-ons
  setAddOns: (addOns) => {
    set((state) => ({
      shipment: {
        ...state.shipment,
        addOns,
      },
    }));
    localStorage.setItem("shipment", JSON.stringify(get().shipment));
  },
  // Map Location {country,region} to shipment
  mapLocationToShipmentAddress: ({ country, region, city }) => {
    const newShipmentAddress: ShipmentAddressType = {
      country: country?.code || "", // Default to an empty string or set a valid default country code
      zip: "", // Optional, can be left empty
      city: city?.name || "", // Optional, can be left empty
      cityId: city?.id || null, // Default to 0 or a valid city ID
      street: "", // Optional, can be left as an empty string
      additionalInfo: null, // Set to null as default or provide default info
      region: region?.name || "", // Optional, can be left as an empty string
      regionCode: region?.code || "", // Optional, default to an empty string
      regionId: city?.regionId || region?.id || null, // Default to 0 or a valid region ID
      timeZoneName: "", // Optional, default to an empty string
      customFields: [], // Default to an empty object
    };
    return newShipmentAddress;
  },
}));
