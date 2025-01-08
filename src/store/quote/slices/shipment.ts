import { components } from "@/types/eurosender-api-types";
import { StateCreator } from "zustand";

export type ShipmentSlice = {
  shipment: components["schemas"]["ShipmentRequest"];

  setDeliveryAddress: (
    address: ShipmentSlice["shipment"]["deliveryAddress"]
  ) => void;
  setDeliveryContact: (
    contact: ShipmentSlice["shipment"]["deliveryContact"]
  ) => void;
  setPickupAddress: (
    address: ShipmentSlice["shipment"]["pickupAddress"]
  ) => void;
  setPickupContact: (
    contact: ShipmentSlice["shipment"]["pickupContact"]
  ) => void;
  setPickupDate: (date: ShipmentSlice["shipment"]["pickupDate"]) => void;
};

const defaultAddress: components["schemas"]["ShipmentAddressRequest"] = {
  country: "",
  zip: null,
  city: null,
  cityId: 0,
  street: null,
  additionalInfo: null,
  region: null,
  regionCode: null,
  regionId: 0,
  timeZoneName: "",
  customFields: [],
};

const defaultValues: ShipmentSlice["shipment"] = {
  deliveryContact: null,
  deliveryAddress: defaultAddress,
  pickupAddress: defaultAddress,
  pickupDate: "",
  addOns: "flexibleChanges",
  pickupContact: null,
};

export const createShipmentSlice: StateCreator<
  ShipmentSlice,
  [],
  [],
  ShipmentSlice
> = (set) => ({
  shipment: { ...defaultValues },
  setDeliveryAddress: (address: ShipmentSlice["shipment"]["deliveryAddress"]) =>
    set((state) => ({ ...state, deliveryAddress: address })),
  setDeliveryContact: (contact: ShipmentSlice["shipment"]["deliveryContact"]) =>
    set((state) => ({ ...state, deliveryContact: contact })),
  setPickupAddress: (address: ShipmentSlice["shipment"]["pickupAddress"]) =>
    set((state) => ({ ...state, pickupAddress: address })),
  setPickupContact: (contact: ShipmentSlice["shipment"]["pickupContact"]) =>
    set((state) => ({ ...state, pickupContact: contact })),
  setPickupDate: (date: ShipmentSlice["shipment"]["pickupDate"]) =>
    set((state) => ({ ...state, pickupDate: date })),
});
