import { components } from "@/types/eurosender-api-types";
import { create } from "zustand";

type addressType = components["schemas"]["ShipmentAddressRequest"]
type shipmentType = components["schemas"]["ShipmentRequest"]

type parcelsType = {
    envelopes: components["schemas"]["PackageRequest"][];
    packages?: components["schemas"]["PackageRequest"][];
    pallets: components["schemas"]["PackageRequest"][];
}

type QuoteRequest = {
    shipment: shipmentType;
    parcels: parcelsType;

    paymentMethod: "credit" | "deferred";

    currencyCode: "EUR";

    serviceType?:
    | "selection"
    | "flexi"
    | "regular_plus"
    | "express"
    | "freight";

    courierTag?: string | null;

    preferredCouriersOnly: boolean;

    courierId?: number | null;

    insuranceId?: number | null;

    labelFormat: "pdf" | "zpl" | null;
};
