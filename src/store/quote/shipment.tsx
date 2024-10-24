import { create } from "zustand";
import { components } from "@/types/eurosender-api-types";

type ShipmentRequest = components["schemas"]["ShipmentRequest"];

type ShipmentAddressRequest = components["schemas"]["ShipmentAddressRequest"]

type ShipmentAddressKey = "pickupAddress" | "deliveryAddress"

type ShipmentStore = {
    shipment: ShipmentRequest | null;
    setShipmentAddress: (key: ShipmentAddressKey, shipmentAddress: ShipmentAddressRequest) => void;
};

export const useShipmentStore = create<ShipmentStore>((set, get) => ({
    shipment: null,
    setShipmentAddress: (key, shipmentAddress) => {
        const currentShipment = get().shipment || {};
        const updatedShipment = {
            ...currentShipment,
            [key]: { ...shipmentAddress },
        } as ShipmentRequest;

        set({ shipment: updatedShipment });
    }
}));


